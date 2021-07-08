const mathFunctions=["sqrt","sin","cos","tg","ctg","arcsin","arccos","arctg","arcctg","log","exp","abs"]
const mathConstants=["pi","e"]
const mathSymbols=["+","-","*","/","(",")"]

class Integration {
    constructor(){
        this.lowerBound=document.getElementById("lowerBound").value;
        this.upperBound=document.getElementById("upperBound").value;
        this.iterations=document.getElementById("numberOfIterations").value;
    }

    isNumber(char){
        if(!isNaN(char)){
            return true;
        }
        else{
            return false;
        }
    }

    isAlpha(char){
        if((/[a-zA-Z]/).test(char)){
            return true;
        }
        else{
            return false;
        }
    }

    calculateByRectangleMethod(){
        let sum=0;
        let alpha=0.5;
        let lengthOfIteration=(this.upperBound-this.lowerBound)/this.iterations;
        let formula=this.convertFormula();
        let x=0;
        for(let i=0; i<this.iterations;i++)
        {
            x=parseFloat(this.lowerBound)+lengthOfIteration*i+alpha*lengthOfIteration;
            sum+=eval(formula);
        }
        sum*=lengthOfIteration;
        sum=sum.toFixed(4);
        return sum;
    }

    calculateIntegral(){
        let integralResult=this.calculateByRectangleMethod();
        console.log(integralResult);
        document.getElementById("integrationResult").textContent=integralResult.toString();
    }
    
    isMathFunction(mathString){
        if(mathFunctions.includes(mathString)){
            return true;
        }
        else{
            return false;
        }
    }

    isMathConstant(mathString){
        if(mathConstants.includes(mathString)){
            mathString=mathString.toUpperCase();
            return true;
        }
        else{
            return false;
        }
    }

    isMathSymbol(mathString){
        if(mathSymbols.includes(mathString)){
            return true;
        }
        else{
            return false;
        }
    }

    normalizeMathConstant(constantName){
        if(this.isMathConstant(constantName)){
            constantName=constantName.toUpperCase();
        }
        return constantName;
    }

    convertFormula(){
        let textFormula=document.getElementById("formula").value;
        let outputFormula="";
        for( var i=0;i<textFormula.length;i++){
            if(this.isAlpha(textFormula[i])){
                let mathStringLength=0;
                let mathString="";
                while(this.isAlpha(textFormula[i+mathStringLength])){
                    if( i+mathStringLength <textFormula.length){
                        mathString+=textFormula[i+mathStringLength]
                        mathStringLength+=1;
                    }
                    else{
                        break
                    }
                }
                if (this.isMathConstant(mathString)||this.isMathFunction(mathString)){
                    mathString=this.normalizeMathConstant(mathString);
                    outputFormula+="Math."+mathString;
                }
                else if(mathString==='x'||mathString==='X'){
                    if(i===0){
                        outputFormula+=mathString;
                    }
                    else if(this.isMathSymbol(outputFormula[outputFormula.length-1])){
                        outputFormula+=mathString
                    }
                    else{
                        outputFormula+='*'+mathString;
                    }
                    
                }
                i+=mathString.length-1;
            }
            else if(textFormula[i]==='^')
            {
                outputFormula+="**";
            }
            else{
                outputFormula+=textFormula[i];
            }
        }
        console.log(outputFormula);
        return outputFormula;
    }
}

function calculate(){
    let myIntegrator= new integration();
    myIntegrator.calculateIntegral();
}