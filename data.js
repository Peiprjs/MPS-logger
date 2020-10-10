fs = require('fs');

module.exports = {    
    loadAll: function (t){        
        var n = {};        
         fs.readdir( t + "/", (err, files) => {
            //handling error
            if (err) {
                return console.log('Unable to scan directory: ' + err);
            } 
            
            //listing all files using forEach
            files.forEach((file) => {
                
                fs.readFile(t + '/' + file, 'utf8', (err,data) => {
                    
                    if (err) {
                      return console.log(err);
                    }
                    var raw = data.split(">;$;<");
                    
                    if(n[raw[0]] == undefined){                
                        
                        n[raw[0]] = [];
                        n[raw[0]] = [raw[1]];
                        n[raw[0]].push(file);    
                        
                    }else{
                        n[raw[0]].push(raw[1]);
                        n[raw[0]].push(file);
                    }                    
                    
                  });                  
            });
        });
        
        return n;
    },

    save: function (user, data, t){

        var raw = "";        
        
        for(var i = 2; i < data.length; i++){
            raw += data[i] + " ";            
        }

        var file_name = Date.now() +".txt";

        fs.writeFile(t + "/" + file_name, user + ">;$;<" + raw, function (err) {
            if (err) throw err;
            console.log('File is created successfully.'); 
        });

        return [raw, file_name];
        
    },

    remove: function (file, t){
        fs.unlink(t + '/' + file, function (err) {
            if (err) throw err;            
            console.log('File deleted!');
        });  
    }

} 

