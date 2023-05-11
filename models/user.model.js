import User from "./user.schema";
export async function createUser(user) {
  let status = null;
  let data = null;
  const { email } = user;
  const check = await User.findOne({ email });
  console.log(check,'hii');
  if (!check) {
    try {
      const newUser = new User({ ...user });
      data = await newUser.save();
      status = true;
    } catch (err) {
       console.log(err);
    }
  } else {
    status = false;
  }
  return {"status": status, "data": data }
}
export async function checkLogin(user){
  let status = null;
  let data = null;
  try{
    const response = await User.findOne({...user});
    if(response){
      console.log(response);
      status = true;
      data = response;
    }else{
      status = false;
    }
  }catch(err){
    console.log(err);
  }

  return { "status": status, "data" : data}

}