const Job = require("../models/Job");


exports.addJob = async(req,res)=>{

const job = await Job.create(req.body);

res.json({
message:"Job added",
job
});

}


exports.getJobs = async(req,res)=>{

const jobs = await Job.find();

res.json(jobs);

}