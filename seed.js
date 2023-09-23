const axios = require('axios');

const apiUrlCreate = 'http://localhost:8081/task/create';

const generateRandomTitle = () => {
    const adjectives = ['Awesome', 'Fantastic', 'Amazing', 'Super', 'Great', 'Cool', 'Wonderful', 'Excellent', 'Fabulous', 'Terrific'];
    const nouns = ['Product', 'Service', 'App', 'Project', 'Idea', 'Feature', 'Website', 'Game', 'Design', 'Solution'];
    const randomAdjective = adjectives[Math.floor(Math.random() * adjectives.length)];
    const randomNoun = nouns[Math.floor(Math.random() * nouns.length)];
    return `${randomAdjective} ${randomNoun}`;
  };
  
  const getRandomStatus = () => {
    const statuses = ['open', 'in_progress', 'completed'];
    return statuses[Math.floor(Math.random() * statuses.length)];
  };
  

const count = process.argv[2] || 10;

// Make 10 API calls with different random titles
for (let i = 0; i < count; i++) {
  const title = generateRandomTitle();
  const status = getRandomStatus();

  const createPayload = {
    title: title
  };

  axios.post(apiUrlCreate, createPayload)
    .then(createResponse => {

      // Extract the id from the first API call response
      const id = createResponse.data.id;
      const title = createResponse.data.title;

      let apiUrlUpdate = `http://localhost:8081/task/update/${id}`;

      const updatePayload = {
        title,
        status: status
      };

      return axios.patch(apiUrlUpdate, updatePayload);
    })
    .then(updateResponse => {
      console.log(`Task created for API call ${i + 1} with status '${status}':`, updateResponse.data);
    })
    .catch(error => {
      console.error(`Error making API call ${i + 1} for title '${title}':`, error.response.message);
    });
}
