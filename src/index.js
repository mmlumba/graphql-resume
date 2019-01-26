const { GraphQLServer } = require('graphql-yoga')
const resume = require('./resume')
const { GraphQLScalarType } = require('graphql');

const typeDefs = `
type Query {
  info: String!
  resume: [Activity]
}

type Activity {
    type: String!
    role: String!
    company: String
    startDate: String!
    endDate: String!
    responsibilities: [String!]!
    credential: String!
    school: String!
}
`

const resolvers = {
  Query: {
    info: () => `Resume info based on GraphQL`,
    resume: () => resume.resume,
  }
}

const server = new GraphQLServer({
  typeDefs,
  resolvers,
})
server.start(() => {
    let resumeArray = resume.resume
    console.log(`Server is running on http://localhost:4000`)
})