
//core module
const fs = require('fs');
const path = require('path');
const rootDir = require('../utils/pathUtil');
const Favourite = require('./favourite');
const { error } = require('console');

const homeDatapath = path.join(rootDir, 'data', 'homes.json'); 

module.exports = class Home{
    constructor(houseName, price, location, photoUrl){
      this.houseName= houseName;
      this.price = price;
      this.location = location;
      this.photoUrl = photoUrl;
    }

    save(){
      
      Home.fetchAll(registeredHomes =>{  
         if(this.id){  //edit home case
          registeredHomes = registeredHomes.map(home =>
           home.id=== this.id? this: home )
      }
      else{ //add home case
        this.id = Math.random().toString();
        registeredHomes.push(this);

      }    
         
      fs.writeFile(homeDatapath, JSON.stringify(registeredHomes), error =>{
        console.log("File writting Concuded", error)
      });
      })
     
    }

    static fetchAll(callback){
  
      fs.readFile(homeDatapath, (err, data)=>{
        callback(!err ? JSON.parse(data): [])
    })
  }

    static findById(homeId, callback){
          this.fetchAll(homes =>{
             const homeFound=  homes.find(home => home.id === homeId);
             callback(homeFound);
          })
    }
     
    static deleteById(homeId, callback){
          this.fetchAll(homes =>{
              homes = homes.filter(home =>
               home.id !== homeId );
                   
      fs.writeFile(homeDatapath, JSON.stringify(homes),error=>{
        Favourite.deleteById(homeId, callback)
      });
          })
    }
    }
    

    