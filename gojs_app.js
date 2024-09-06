const toggleBtn = document.querySelector("#toggleHide");
const input =document.querySelector("#text");
const submit =document.querySelector("#submit");
input.value = "1 2 3 5 N 4 6 11 5 55 100 7 99 120 140";

let showNodes=false;
toggleBtn.addEventListener("click",()=>{
  showNodes=!showNodes;
  console.log("showNOdes=",showNodes);
  updateDiagram();
});
const myDiagram = new go.Diagram("myDiagramDiv", {
  // enable Ctrl-Z to undo and Ctrl-Y to redo
  "undoManager.isEnabled": true,
});

myDiagram.layout = new go.TreeLayout({ angle: 90, layerSpacing: 35 });

// new go.Shape({
//     fill: new go.Brush("Linear", { 0: "white", 1: "lightblue" }),
//     stroke: "darkblue", strokeWidth: 2
//   }),

myDiagram.nodeTemplate = new go.Node("Auto").add(
  new go.Shape("Ellipse",{
    fill: new go.Brush("Linear", { 0: "lawngreen", 1: "darkgreen" }),
    stroke: "white", strokeWidth: 2
  }),
  new go.TextBlock("Default Text", {
    margin: 12,
    stroke: "white",
    font: "bold 16px sans-serif",
  }).bind("text", "name")
);
//creating a child:pararent object;
//1 2 3 N N 4 6 N 5 N N 7 N
// const arr=[1,2,3,"N","N",4,6,"N",5,"N","N",7,"N"];
let arr=[1,2,3,5,"N",4,6,11,5,55,100,7,99,120,140];
let par_child = { };
let index=0,curr=0;
while (index < arr.length) {
  if(arr[index]!="N"){
    let child1 = ++curr;
    let child2 = ++curr;
    let x = {
      [child1] : index,
      [child2] : index,
    }
    par_child = {...par_child , ...x};
    index++;
  }
  else{
    index++;
  }
}
console.log(par_child);

function updateDiagram(){
  const treeobj = [] ;
  treeobj.push({ key: 0, name: arr[0] });
  for (let i = 1; i < arr.length; i++) {
    let obj = {
      key : i,
      parent : par_child[i],
      name : arr[i],
    }
    if(showNodes){
      treeobj.push(obj);
    }else{
      if(arr[i]!="N"){
        treeobj.push(obj);
      }
    }
  }
  
  myDiagram.model = new go.TreeModel(treeobj);
}

updateDiagram();

submit.addEventListener("click",(event)=>{
   let str=input.value;
   let tempstr="";
   let newArr=[];
   for(let i=0;i<str.length;i++){
      tempstr+=str[i];
      if(str[i]!=" " && str[i+1]===" "){
        newArr.push(tempstr);
        tempstr="";
      }
      else if(i===str.length-1 && str[i]!=" " ){
        newArr.push(tempstr);
        tempstr="";
      }
   }
   arr=newArr;
   console.log(arr);
   updateDiagram();
});


// [
//   // the "key" and "parent" property names are required,
//   // but you can add whatever data properties you need for your app
//   { key: "1", name: "2" },
//   { key: "2", parent: "1", name: "3" },
//   { key: "3", parent: "1", name: "8" },
//   { key: "4", parent: "3", name: "5" },
//   { key: "5", parent: "3", name: "N" },
//   { key: "6", parent: "2", name: "20" },
//   { key: "6a", parent: "2", name: "15" },
//   { key: "7", parent: "4", name: "10" },
//   { key: "8", parent: "4", name: "11" },
//   { key: "9", parent: "6a", name: "15a" },
//   { key: "10", parent: "6a", name: "15b" },
// ]