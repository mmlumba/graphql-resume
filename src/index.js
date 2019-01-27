const { GraphQLServer } = require('graphql-yoga')
const resumeImport = require('./resume')

const resume = resumeImport.resume

const typeDefs = `
type Query {
  info: String!
  resume: [Activity]
  work: [WorkActivity]
  education: [EducationActivity]
  volunteer: [VolunteerActivity]
}

interface Activity {
    type: String
    startDate: String
    endDate: String
}

type WorkActivity implements Activity {
    type: String
    startDate: String
    endDate: String
    role: String
    company: String
    responsibilities: [String!]
}

type EducationActivity implements Activity {
    type: String
    startDate: String
    endDate: String
    credential: String
    school: String
}

type VolunteerActivity implements Activity{
    type: String
    startDate: String
    endDate: String
    role: String
    organization: String
    responsibilities: [String!]
}
`

const resolvers = {
  Activity: {
    __resolveType(activity) {
        if (activity.company) {
            return 'WorkActivity'
        }
        else if (activity.school) {
            return 'EducationActivity'
        }
        else if (activity.organization) {
            return 'VolunteerActivity'
        }
        else {
            return null
        }
    }
  },
  Query: {
    info: () => `Resume info based on GraphQL`,
    resume: () => resume,
    work: () => resume.filter(work => work.hasOwnProperty("company")),
    education: () => resume.filter(school => school.hasOwnProperty("school")),
    volunteer: () => resume.filter(school => school.hasOwnProperty("volunteer"))
  }
}

const server = new GraphQLServer({
  typeDefs,
  resolvers,
})
server.start(() => {
    console.log(`Server is running on http://localhost:4000`)
})