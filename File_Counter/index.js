const { Storage } = require('@google-cloud/storage');
const storage = new Storage();

const MalBucket = storage.bucket('cit41200-zdscofie-bad-files');
const BenBucket = storage.bucket('cit41200-zdscofie-benign-files');

exports.countFiles = async (req , res) => {
    const unit = req.query.unit;
    
    let responseValue;
    
    if(unit == "Benign"){
       await fileLooper( res , "Ben");
        responseValue = "Benign" ; 
    } 
 
    else{
        res.status(406).send("Unable to process request");
        return; 
    }
    res.status(200).send(responseValue.toString());
    
};

//helper
    




fileLooper = async ( res , bucket) => {
    if ( bucket == "Ben"){
            
    const [files] = await storage.bucket('cit41200-zdscofie-benign-files').getFiles();
    const [files2] = await storage.bucket('cit41200-zdscofie-bad-files').getFiles();

   let i = 0;
   let j = 0;


  files.forEach(file => {
        i++;
   });

  files2.forEach(file2 => {
        j++;
   });


   console.log("There are " + i + " files in the benign bucket and There are " + j + " files in the malicious bucket. "); 
   res.status(200).send("There are " + i + " files in the benign bucket and There are " + j + " files in the malicious bucket. ");
   return i;  

    }
    else{
        console.log("Error , unit incorrect");
    }
   
  };