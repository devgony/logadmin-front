module.exports = {
  client: {
    includes: ["./src/**/*.{tsx,ts}"],
    tagName: "gql",
    service: {
      name: "logadmin-back",
      url: "http://localhost:5001/graphql",
    },
  },
};
