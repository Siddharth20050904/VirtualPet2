class Food{
    constructor(){
        this.image = loadImage("Milk.png");
        
    }

    display(){
        var x=80,y=100;
        if(gameState===1){image(this.image,720,220,70,70);}
        if(foodStock!=0){
            for(var i=0; i<foodStock; i++){
                if(i%10===0){
                    y=y+80
                    x=80;
                }
                image(this.image,x,y,70,70);
                x=x+30;
            }
        }
    }
    
    
    getFoodStock(){
        var dbref = database.ref('foodStock/foodStock')
  
        dbref.on("value",function(data){
            var db = data.val();
            //console.log(db);
            foodStock = db;
            
        })
    }
    updateFoodStock(x,hour){
        var dbref = database.ref('foodStock').update({
            foodStock:x
        })
    }
    updateLastFed(x){
        var dbref = database.ref('foodStock').update({
            feedTime:x
        })
    }
}