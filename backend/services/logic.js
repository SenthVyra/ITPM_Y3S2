const db=require('./db')

//get all garbages

const allGarbages=()=>{
    return db.Campaign.find().then(
        (result)=>{
            if(result){
                return{
                    statusCode:200,
                    garbages:result
                }
            }else{
                return{
                    statusCode:404,
                    message:'Campaigns not found'
                }
            }
        }
    )
}
//add garbages
const addGarbages=(id,garbage,cteam,quantity,status)=>{
    return db.Campaign.findOne({id}).then(
        (result)=>{
            if(result){
                return{
                    statusCode:400,
                    message:'Campaign already exists'
                }
            }else{
                const newGarbage=new db.Campaign({id,garbage,cteam,quantity,status})
                newGarbage.save()
                return{
                    statusCode:200,
                    message:'Campaign successfully added'
                }
            }
        }
    )
}
//add garbages
const editGarbages=(id,garbage,cteam,quantity,status)=>{
    return db.Campaign.findOne({id}).then(
        (result)=>{
            if(result){
                result.id=id,
                result.garbage=garbage,
                result.cteam=cteam,
                result.quantity=quantity,
                result.status=status
                result.save()
                return{

                    statusCode:200,
                    message:'Campaign details edited successfully'
                }
            }
        }
    )
}
//delete garbages
const deleteGarbages=(id)=>{
    return db.Campaign.deleteOne({id}).then(
        (result)=>{
            if(result){
                return{
                    statusCode:200,
                    message:'Deleted sucessfully'
                }
            }else{
                return{
                    statusCode:400,
                    message:'No data'
                }
            }
        }
    )
}

//get garbages
const getGarbage=(id)=>{
    return db.Campaign.findOne({id}).then(
        (result)=>{
            if(result){
                return{
                    statusCode:200,
                    campaign:result,
                    message:'Got data'
                }
            }else{
                return{
                    statusCode:400,
                    message:'No data'
                }
            }
        }
    )
}
module.exports={
    allGarbages,
    addGarbages,
    editGarbages,
    deleteGarbages,
    getGarbage
}
