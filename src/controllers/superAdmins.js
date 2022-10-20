import SuperAdmins from '../models/SuperAdmins';

const deleteSuperAdmin = async (req, res) => {
  const idSuperAdmin = req.params.id;

  try {
    const result = await SuperAdmins.findByIdAndDelete(idSuperAdmin);
    if(result === null){
      throw new Error("Super admin doesn't exist");
    }
    return res.status(204).json({
      message:"super admin deleted",
      data: result,
      error:false
    })
    
  } catch (error) {
    let statusCode = 400;
    if (error.message.includes("Super admin doesn't exist")){
      statusCode = 404;
    }
    return res.status(statusCode).json({
      message:error.toString(),
      data:undefined,
      error:true
    })
  }
};

const updateSuperAdmin = async (req, res) => {
  
  try {
    const result = await SuperAdmins.findByIdAndUpdate(req.params.id,req.body);
    if (result === null){
      throw new Error("Super admin doesn't exist");
    }
    return res.status(200).json({
      message:"Super admin updated",
      data:result,
      error:false
    })
  } catch (error) {
    let statusCode = 400;
    if (error.message.includes("Super admin doesn't exist")){
      statusCode = 404;
    }
    return res.status(statusCode).json({
      message:error.toString(),
      data:result,
      error:true
    })
  }
};

export {
  deleteSuperAdmin,
  updateSuperAdmin,
};
