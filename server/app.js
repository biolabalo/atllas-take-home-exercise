const express = require('express');
const { Agent, Review } = require('./model');

const app = express();

app.use(express.urlencoded({extended: true}));
app.use(express.json()) 

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get('/agents', async (req, res) => {
  const agents = await Agent.findAll();
  return res.json(agents);
});

const validateReqBody  = (req) => {
  let errors = [];

  if(!req.body.firstName){
      errors.push({ "firstname": "First name is missing in request body"});
  }

  if(!req.body.lastName){
    errors.push({ "lastName": "Last name is missing in request body"});
 }

 if(!req.body.agentLicence){
  errors.push({ "agentLicence": "agent Licence is missing in request body"});
}

if(!req.body.address){
  errors.push({ "address": "address is missing n request body"});
}

return errors
};

app.post('/agents', async (req, res) => {
 
   const errors =  validateReqBody(req);
  
   if(errors.length > 0){
    return res.status(400).json({error: errors})
   }

  try {
    const agents = await Agent.create(req.body);
      const allAgents = await Agent.findAll();
      return  res.status(201).json(allAgents);

  }catch(err){
   res.status(422).json({ error: 'Failed to create agent' });
  }

});


app.get('/agents/:id', async (req, res) => {
  const agentId = req.params.id;
  const agentDetails = await Agent.findAll({ where: {id: agentId} });
  const agentReviews = await Review.findAll({ where: { agentId } });
  const agent = {
    details: agentDetails[0],
    reviews: agentReviews
  };

  try {
    return res.json(agent);
  } catch (error) {
    return res.status(400).json({error})
  }
})

app.post('/agent/:id',  async (req, res) => {
  console.log("hit me")
  const { review } = req.body;
  const agentId = req.params.id;

  if (!req.body.review)
  return res.status(400).json({
    error: "review missing in request body"
  })
  
  try {
    await Review.create({ details: review, agentId });
    return res.status(201).end();
  } catch (error) {
    console.log(error)
    res.status(422).json({ error: 'Failed to create agent review' });
  }

})

module.exports = app;
