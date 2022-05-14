var name = "steve";
        
function fun() {
        var b = 20;
        console.log(name);
        function y(){ 
            console.log(b);            
        }
        b = 100;
        return y;
}


    
var newFun = fun();
newFun();       // ye indirectly y() ko call lgi hai 
                //1. fun() ko call lgi
                //2. usne y return kiya matlab y fxn ka address aa gya newFun me
                //3. newFun() ko call lgi jisme eventuall y fxn ka address hi pda hai 
                //4. to y() hi execute hoga