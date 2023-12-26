const Exp = require('../model/exp');;

const getExp = (req,res)=>{
    Exp.findAll()
        .then(exps =>{
            res.send(exps);
        })
        .catch(err =>{
            console.log(err);
        })
}

const addExp =  async (req, res) =>{
    try{
        const amount = req.body.amount;
        const description = req.body.description;
        const category = req.body.category;

        console.log(amount, description, category);

        const exp = await Exp.create({
            amount: amount,
            description: description,
            category: category
        });
        console.log({exp: exp});
        res.send(exp);
    }
    catch(err){
        console.error(err);
        res.status(500).send('Internal Server Error');

    }
}

const delExp = async(req,res) =>{
    const eid = req.params.id;
    try{
        const rowsDeleted = await Exp.destroy({
            where: {id: eid}
        })
        if(rowsDeleted > 0){
            res.status(204).send();
        }
        else{
            res.status(404).send('Expence not found');
        }
    }
    catch(err){
        console.log(err);
        res.status(500).send('Internal Server Error');
    }
}

module.exports = {
    getExp,
    addExp,
    delExp
}