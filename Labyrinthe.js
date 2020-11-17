
class Case 
{
  posX = 0;
  posY = 0;
  walls = [false, false, false, false];  
  constructor(pPosX, pPosY, pWalls) 
  {
      this.posX = pPosX
      this.posY = pPosY
      this.walls = pWalls
  }
}

class Labyrinthe
{
    taille = 0 ;
    tabCase = []
    constructor(pTaille,pTabCase)
    {
        this.taille = pTaille;
        this.tabCase = pTabCase
    }
}

console.log(data);



  function createLabyrinth(data, tailleLigne)
  {
    let labyrinth = [];
    let ligne = [];
    
    let pion_on = false;
    let rice_on_cell = false;
    
    for (let i = 0; i <= data.length-1; i++){
        let start_cell = false;
        let end_cell = false;
        if (i === 0){
            start_cell = true;
        }
        if (i === data.length-1){
            end_cell = true;
        }
        let cellule =
        {
          posX: data[i].posX,
          posY: data[i].posY,
          walls: data[i].walls,
          start_cell: start_cell,
          end_cell: end_cell,
          pion_on: pion_on,
          rice_on_cell: rice_on_cell
        } 
        //labyrinth.push(cellule);
        ligne.push(cellule);
        if(ligne.length == tailleLigne)
        {
          labyrinth.push(ligne);
          ligne = [];
        }
        
    }

  console.log(labyrinth);
    return labyrinth;
}


  function afficherLabyrinthe (labyrinthe, tailleLigne)
  {
    let grid = document.querySelector('.grid-container');
    console.log(grid);

    // Pour chaque ligne
    for (i=0; i < labyrinthe.length; i++)
    {
      var ligneCourante = labyrinthe[i];
      console.log("Ligne courante ");
      console.log(ligneCourante);

      // Pour chaque cases de la ligne
      for(j=0; j<tailleLigne;j++)
      {
      
        var maCase = document.createElement('div');
        maCase.classList.add("case");
        grid.appendChild(maCase);
        maCase.textContent ="X:" + ligneCourante[j].posX + " Y: " + ligneCourante[j].posY; 
        
        if (ligneCourante[j].walls[0] == true) 
        {
          maCase.style.borderTop = 'solid black';
          id = ligneCourante[j].posX + "-" + ligneCourante[j].posY;
        }
        else 
        {
          maCase.style.borderTop = 'solid white'
          id = ligneCourante[j].posX + "-" + ligneCourante[j].posY;
        }
        if (ligneCourante[j].walls[1] == true) 
        {
          maCase.style.borderRight = 'solid black';
          id = ligneCourante[j].posX + "-" + ligneCourante[j].posY;
        }
        else 
        {
          maCase.style.borderRight = 'solid white'
          id = ligneCourante[j].posX + "-" + ligneCourante[j].posY;
        }
        if (ligneCourante[j].walls[2] == true) 
        {
          maCase.style.borderBottom = 'solid black';
          id = ligneCourante[j].posX + "-" + ligneCourante[j].posY;
        }
        else 
        {
          maCase.style.borderBottom= 'solid white'
          id = ligneCourante[j].posX + "-" + ligneCourante[j].posY;
        }
        if (ligneCourante[j].walls[3] == true) 
        {
          maCase.style.borderLeft = 'solid black';
          id = ligneCourante[j].posX + "-" + ligneCourante[j].posY;
        }
        else 
        {
          maCase.style.borderLeft = 'solid white'
          id = ligneCourante[j].posX + "-" + ligneCourante[j].posY;
        }
        if(i==0 && j==0)
        {
          maCase.style.backgroundColor = 'orange';
          id = ligneCourante[j].posX + "-" + ligneCourante[j].posY;
          ligneCourante[j].start_cell = true;
        } 
        if (i == labyrinthe.length -1 && j == tailleLigne-1)
        {
          maCase.style.backgroundColor = 'blue';
          id = ligneCourante[j].posX + "-" + ligneCourante[j].posY;
          ligneCourante[j].end_cell= true;
        }
      } // Fin du for(j=0; j<tailleLigne;j++)
    } // Fin du pour chaque ligne
 
  }
  
  //console.log(data["3"]["ex-0"]);
  var tailleLaby = '6';
  var labyrinthe = createLabyrinth(data[tailleLaby]['ex-1'], parseInt(tailleLaby));
  afficherLabyrinthe(labyrinthe, parseInt(tailleLaby));
  //DFS(labyrinthe)
  BFS(labyrinthe);

  function get_unvisited_neighbours(case_courante){
    let neighbours = [];

    let case_bas = {posX: case_courante.posX+1, posY: case_courante.posY};

    let case_haut = {posX: case_courante.posX-1, posY: case_courante.posY};

    let case_droite = {posX : case_courante.posX, posY: case_courante.posY+1};

    let case_gauche = {posX: case_courante.posX, posY: case_courante.posY-1};

    // Si la case courante n'a pas de mur en haut
    if (labyrinthe[case_courante.posX][case_courante.posY].walls[0] === false){
      // Si la cause du haut n'a pas de grain de riz
      if (labyrinthe[case_haut.posX][case_haut.posY].rice_on_cell === false){
        // alors la case du haut est un voisin  
        neighbours.push(case_haut);
      }
    }
    if (labyrinthe[case_courante.posX][case_courante.posY].walls[1] === false){
      if (labyrinthe[case_droite.posX][case_droite.posY].rice_on_cell === false){
        neighbours.push(case_droite);
      }
    }
    if (labyrinthe[case_courante.posX][case_courante.posY].walls[2] === false){
      if (labyrinthe[case_bas.posX][case_bas.posY].rice_on_cell === false){
        neighbours.push(case_bas);
      }
    }
    if (labyrinthe[case_courante.posX][case_courante.posY].walls[3] === false){
      if (labyrinthe[case_gauche.posX][case_gauche.posY].rice_on_cell === false){
        neighbours.push(case_gauche);
      }
    }

    return neighbours;
}


function DFS(labyrinthe) 
{

  //pion et case_courante sont indentiques
  let pion = {posX:0, posY :0}
  let case_courante = {posX:0, posY :0};
  //Si une case a déjà été visité 
  let isVisited = false;
  let stack = []; //liste des cases à visiter
  //tableau de voisin vide
  let neighbours=[] ;
  // On passe les parametre de X et de Y un a un (sinon ça ne marche pas)
  case_courante.posX= pion.posX;
  case_courante.posY= pion.posY;

  // On récupère les voisins de la case 0. On les place dans la stack
  neighbours = get_unvisited_neighbours(pion);
  //Pour tous les voisins, on ajoute les cases une par une dans la stack, (si j'ajoute neighbour dans stack, ça fait de stack un tableau de tableau)
  for(i=0; i<neighbours.length; i++)
  {
    let voisin = {posX:0, posY :0};
    voisin.posX = neighbours[i].posX;
    voisin.posY = neighbours[i].posY;
    stack.push(voisin);
  }

  
  let nombreEtape = 0;
    
  // Tant que la case courante n'est pas la sortie
  while( labyrinthe[case_courante.posX][case_courante.posY].end_cell == false)
  {
    //On avance vers le dernier voisin. On passe ce meme voisin a case courante
    let dernierVoisin = {posX:0, posY :0};
    //On récupere le dernier voisin mis dans la stack (et on l'enleve de la stack)
    dernierVoisin = stack.pop();
    //On laisse un grain de riz
    labyrinthe[case_courante.posX][case_courante.posY].rice_on_cell=true;
    //on recupere le dernier voisin en tant que case courante pour que le while fonctionne
    case_courante=dernierVoisin;

    console.log("Coordonnees case courante : X="+case_courante.posX+" Y="+case_courante.posY);
    nombreEtape++;
    // On récupère les nouveaux voisins de case courante que l'on place aussi dans la stack
    neighbours = get_unvisited_neighbours(case_courante);
    //Pour tous les voisins, on ajoute les cases une par une dans la stack, (si j'ajoute neighbour dans stack, ça fait de stack un tableau de tableau)
    for(i=0; i<neighbours.length; i++)
    {
      let voisin = {posX:0, posY :0};
      voisin.posX = neighbours[i].posX;
      voisin.posY = neighbours[i].posY;
      stack.push(voisin);
    }
  }

  console.log("fin en nbEtape "+nombreEtape)
}


function BFS (labyrinthe)
{
  case_courante = {posX : 0, posY : 0 }
  labyrinthe[case_courante.posX][case_courante.posY].rice_on_cell = true;
  let queue = [];
  let neighbours = [];
  queue.push(case_courante);
  while (queue.length > 0)
  {
    case_courante = queue.shift();
    if (labyrinthe[case_courante.posX][case_courante.posY].end_cell == true)
    {
      return;
    } 
    else 
    {
      neighbours = get_unvisited_neighbours(case_courante);
      for (i=0; i < neighbours.length ; i++)
      {
        let voisin = {posX:0, posY :0};
        voisin.posX = neighbours[i].posX;
        voisin.posY = neighbours[i].posY;
        labyrinthe[voisin.posX][voisin.posY].rice_on_cell = true;
        queue.push(voisin);
      }
    }
  }
}


/*
function avancerPion()
{
  if (labyrinthe.walls[2])
  pion.posX++;
}


function borderDevant() 
{
  if (orientationPion = "versDroite" && borderRight == true)
  {
    return true;
  }
  if (orientationPion = "versGauche" && borderLeft == true)
  {
    return true;
  }
  if (orientationPion = "versHaut" && borderTop == true)
  {
    return true;
  }
  if (orientationPion = "versBas" && borderBottom == true)
  {
    return true;
  }
}

function tournerVersLaDroite()
{
  if (OrientationPion = "versDroite")
  {
    OrientationPion ="versBas"
  }
  if (OrientationPion = "versBas")
  {
    OrientationPion ="versGauche"
  }
  if (OrientationPion = "versGauche")
  {
    OrientationPion ="versHaut"
  }
  if (OrientationPion = "versHaut")
  {
    OrientationPion ="versDroite"
  }
  
}

function changeDeCase()
{
  poserGrainDeRiz();
  if (OrientationPion == "versDroite")
  {
     posY=posY+1;
  }
  if (OrientationPion == "versGauche")
  {
     posY=posY-1;
  }
  if (OrientationPion == "versBas")
  {
     posX= posX+1;
  }
  if (OrientationPion == "versHaut")
  {
     posX=posX-1;
  }

  function poserGrainDeRiz()
  {
    tabRiz(XPion,YPion) = true
  }

  function grainDeRizDevant()
  {
    
  }
  */

// var grid = document.getElementById('grid-container');
// var case1 = document.createElement('div');
// case1.classList.add("case");
// grid.appendChild(case1);
// case1.style.borderTop = 'solid red';








// var tab = document.createElement('table');
// var ligne = document.createElement('tr')
// var colonne = document.createElement('td')
// colonne.textContent = "Prout";
// colonne.style.marginTop = ".25cm";
// ligne.appendChild(colonne);
// tab.appendChild(ligne);
// body.appendChild(tab);

