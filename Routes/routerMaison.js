const express = require ('express');
const modMaison = require('../models/modMaison');
const modAgent = require('../models/modAgent');
const router = express.Router();

router.get('/ListMaisons',(req,res)=>{
    modMaison.find().exec()
    .then(envoi => res.status(200).json(envoi));
    });

router.post('/addMaison',(req,res)=>{
    console.log('req.body',req.body);
    const modelMaison = new modMaison(req.body);
    modelMaison.save((err,maison)=>{
    if(err){
        return res.status(500).json(err);
    }
    res.status(201).json(maison);
    }); 
    });
    router.put('/upMaison/:id',(req,res)=>{
        const id_maison =req.params.id;
        modMaison.findById(id_maison).then(maison=>{
            maison.code=req.body.code;
            maison.titre=req.body.titre;
            maison.description=req.body.description;
            maison.prix=req.body.prix;
            maison.adresse=req.body.adresse;
            maison.agent=req.body.agent;

          maison.save()
          .then(()=>res.json('Edition reussie !'))
          .catch(err=>res.status(400).json('error on saving'+err));
        })
        .catch(err=> res.status(400).json('Error with id: '+err));
    });

    router.get('/readMaison/:id',(req,res)=>{
        const id_maison = req.params.id;
         modMaison.findById(id_maison).then(maison=>{
            res.send(maison);
            console.log(maison);
          });

    });

    router.delete('/delMaison/:id',(req,res)=>{
        const id_maison =req.params.id;

        modMaison.findByIdAndDelete(id_maison,(err,maison) => {
          if(err){
              return res.status(500).json(err);
          }
          res.status(202).json({msg:`La maison avec l'id ${maison._id} supprimee`} );
        });
        });

        //POUR LES AGENTS 
        router.post('/addAgent',(req,res)=>{
            console.log('req.body',req.body);
            const Agent = new modAgent(req.body);
            Agent.save((err,agent)=>{
            if(err){
                return res.status(500).json(err);
            }
            res.status(201).json(agent);
            }); 
            }); 

            router.get('/ListAgents',(req,res)=>{
                modAgent.find().exec()
                .then(envoi => res.status(200).json(envoi));
                });  

           router.put('/upAgent/:id',(req,res)=>{
                    const id_agent =req.params.id;
                    modAgent.findById(id_agent).then(agent=>{
                        agent.nom = req.body.nom;
                        agent.numero = req.body.numero;

                      agent.save()
                      .then(()=>res.json('Edition reussie !'))
                      .catch(err=>res.status(400).json('error on saving'+err));
                    })
                    .catch(err=> res.status(400).json('Error with id: '+err));
                });  

                router.get('/readAgent/:id',(req,res)=>{
                    const id_agent = req.params.id;
                     modAgent.findById(id_agent).then(agent=>{
                        res.send(agent);
                        console.log(agent);
                      });
            
                });
                router.delete('/delAgent/:id',(req,res)=>{
                    const id_agent =req.params.id;
            
                    modAgent.findByIdAndDelete(id_agent,(err,agent) => {
                      if(err){
                          return res.status(500).json(err);
                      }
                      res.status(202).json({msg:`L'agent avec l'id ${agent._id} supprimee`} );
                    });
                    });
module.exports=router;