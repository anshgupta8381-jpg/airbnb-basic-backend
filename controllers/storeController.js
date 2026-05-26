const Favourite = require('../models/favourite');
const Home = require('../models/home')

exports.getIndex= (req,res, next)=>{ 
  Home.fetchAll(registeredHomes=>
    res.render('store/index', {
                      registeredHomes: registeredHomes,
                      pageTitle: 'airbnb-home',
                      currentPath: '/index'
  })
  );  
}

exports.gethomes= (req,res, next)=>{ 
  Home.fetchAll(registeredHomes=>
    res.render('store/home-list', {
                      registeredHomes: registeredHomes,
                      pageTitle: 'Homes List',
                      currentPath: '/home'
  })
  );  
}

exports.getBookings = (req,res, next)=>{  
    res.render('store/bookings', {
                      pageTitle: 'My Bookings',
                      currentPath: '/bookings'
  });  
}

exports.getfavouriteList = (req,res, next)=>{ 
  Favourite.getFavourites(favourites =>{
    
    Home.fetchAll(registeredHomes=> {

      const favouriteHomes = registeredHomes.filter(
        home => favourites.includes(home.id)
      );

      res.render('store/favourite-list', {
        favouriteHomes: favouriteHomes,
        pageTitle: 'My Favourites',
        currentPath: '/favourites'
      });

    });

  }) 
}

exports.postAddToFavourite = (req, res, next) => {

  console.log(req.body);

  Favourite.addToFavourite(req.body.Id, error => {

    if(error){
      console.log("Error while marking favourite:", error);
    }

    res.redirect("/favourites");

  });

}

exports.postRemoveFromFavourite = (req, res, next) => {
    const homeId = req.params.homeId;
    Favourite.deleteById(homeId, error =>{
      if(error){
        console.log('error while removing fav', error)
      }
       res.redirect("/favourites");
    })
}

exports.getHomeDetails = (req,res, next)=>{ 
  const homeId = req.params.homeId;

  Home.findById(homeId, home=>{
    if(!home){
      console.log("Home not found");
      res.redirect("/homes");
    }
    else{
    
    
    res.render('store/home-detail', {
                      home: home,
                      pageTitle: 'Home Detail',
                      currentPath: '/home'
  }); }
  })
  
}

