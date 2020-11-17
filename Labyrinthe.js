
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
  DFS(labyrinthe)



function get_unvisited_neighbours(case_courante)
{
  //let case_courante;
  /*let neighbour;
  let case_bas = case_courante.posX+1;
  let case_haut = case_courante.posX-1;
  let case_droite = case_courante.posY+1;
  let case_gauche = case_courante.posY-1;
    if(case_bas.walls[0] === false)
    {
      neighbour = case_bas;
    }
    if(case_haut.walls[1] === false)
    {
      neighbour = case_haut;
    }
    if(case_droite.walls[2] === false)
    {
      neighbour = case_droite;
    }
    if(case_gauche.walls[3] === false)
    {
      neighbour = case_gauche;
    }
    return neighbour;*/

    let neighbours = [];
    let case_bas;
    let case_haut;
    let case_droite;
    let case_gauche;

    // Cas en haut à gauche (si tu es en 0 0)
    if(case_courante.posX==0 && case_courante.posY==0)
    {
      //On regarde ta case de droite qui a pour positier X=0 et ton Y+1
      case_droite = {posX:0, posY :case_courante.posY+1}
      // Si ta case de droite dans le labyrinthe n'a pas de mur à gauche et pas de grain de riz
      if( labyrinthe[case_droite.posX][case_droite.posY].walls[3] == false && labyrinthe[case_droite.posX][case_droite.posY].rice_on_cell == false)
      {
        // on l'ajoute dans les voisins
        neighbours.push(case_droite);
      }
      // On regarde ta case du bas qui a pour position ta pos.X+1 et ta posY.
      case_bas = {posX: case_courante.posX+1, posY : case_courante.posY=0}
      //Si ta case du bas dans le labyrinthe n'a pas de mur en haut et n'a pas de grain de riz
      if ( labyrinthe[case_bas.posX][case_bas.posY].walls[0] == false && labyrinthe[case_bas.posX][case_bas.posY].rice_on_cell == false)
      {
        //On l'ajoute dans les voisins
        neighbours.push(case_bas);
      }
    }

    // Cas en haut à droite (si tu es en X=0 et Y=derniere case du laby)
    else if(case_courante.posX==0 && case_courante.posY == tailleLaby - 1)
    {
      //On regarde ta case de gauche qui est ton X et ton Y -1
      case_gauche = {posX:0, posY:case_courante.posY-1}
      //Si ta case de gauche n'a pas de mur à droite et pas de grain de riz
      if (labyrinthe[case_gauche.posX][case_gauche.posY].walls[1] == false && labyrinthe[case_gauche.posX][case_gauche.posY].rice_on_cell == false)
      {
        //On l'ajoute dans les voisins
        neighbours.push(case_gauche)
      }
      //On regarde ta case du bas (si tu es en x+1 et meme Y)
      case_bas = {posX: case_courante.posX+1, posY: case_courante.posY}
      //Si ta case du bas n'a pas de mur en haut et pas de grain de riz
      if(labyrinthe[case_bas.posX][case_bas.posY].walls[0] == false && labyrinthe[case_bas.posX][case_bas.posY].rice_on_cell == false)
      {
        //On l'ajoute dans les voisins
        neighbours.push(case_bas)
      }
      
    }         
  
    // Cas en bas à gauche (si tu es pos derniere case du laby et Y = 0)
    else if(case_courante.posX==tailleLaby-1 && case_courante.posY==0)
    {
      // On regarde ta case du haut (si tu es en pos X-1 et meme pos Y)
      case_haut = {posX:case_courante.posX-1, posY:case_courante.posY};
      //Si ta case du haut n'a pas de mur en bas et pas de grain de riz
      if (labyrinthe[case_haut.posX][case_haut.posY].walls[2] == false && labyrinthe[case_haut.posX][case_haut.posY].rice_on_cell == false)
      {
        // On l'ajoute dans les voisins
        neighbours.push(case_haut)
      }
      //On regarde ta case de droite (meme X et Y+1)
      case_droite = {posX:case_courante.posX, posY:case_courante.posY+1};
      //So ta casee de drotie n'a pas de mur a gauche et n'a pas de grain de riz
      if (labyrinthe[case_droite.posX][case_droite.posY].walls[3] == false && labyrinthe[case_droite.posX][case_droite.posY].rice_on_cell == false)
      {
        //On l'ajoute au voisin
        neighbours.push(case_droite)
      }
    }

    // Cas en bas à droite (si ton pos X = derniere case du laby et pareil pour le Y)
    else if(case_courante.posX==tailleLaby-1 && case_courante.posY==tailleLaby-1)
    {
      //On regarde ta case de gauche (si tu es en pos X la meme et Y-1)
      case_gauche = {posX:case_courante.posX, posY:case_courante.posY-1};
      //Si ta case de gauche n'a pas de mur a droite et pas de grain de riz
      if (labyrinthe[case_gauche.posX][case_gauche.posY].walls[1] == false && labyrinthe[case_gauche.posX][case_gauche.posY].rice_on_cell == false)
      {
        //On l'ajoute au voisin
        neighbours.push(case_gauche)
      }
      //On regarde ta case du haut(meme Y, mais ton X-1)
      case_haut = {posX:case_courante.posX-1, posY:case_courante.posY};
      //Si ta case du haut n'a pas de mur en bas et n'a pas de grain de riz
      if (labyrinthe[case_haut.posX][case_haut.posY].walls[2] == false && labyrinthe[case_haut.posX][case_haut.posY].rice_on_cell == false)
      {
        //On l'ajoute au voisin
        neighbours.push(case_haut)
      }
      
    }

    // Cas première ligne
    else if(case_courante.posX==0)
    {
      //On regarde ta case du bas (meme Y mais pos X+1)
      case_bas = {posX: case_courante.posX+1, posY : case_courante.posY}
      //Si ta case du bas ne possede pas de mur en haut et pas de grain de riz
      if ( labyrinthe[case_bas.posX][case_bas.posY].walls[0] == false && labyrinthe[case_bas.posX][case_bas.posY].rice_on_cell == false)
      {
        //On l'ajoute au voisin
        neighbours.push(case_bas);
      }
      
      case_droite = {posX:0, posY :case_courante.posY+1}
      // Si la case de droite dans le labyrinthe n'a pas de mur à gauche
      if( labyrinthe[case_droite.posX][case_droite.posY].walls[3] == false && labyrinthe[case_droite.posX][case_droite.posY].rice_on_cell == false)
      {
        // on l'ajoute dans les voisins
        neighbours.push(case_droite);
      }

      case_gauche = {posX:0, posY:case_courante.posY-1}
      if (labyrinthe[case_gauche.posX][case_gauche.posY].walls[1] == false && labyrinthe[case_gauche.posX][case_gauche.posY].rice_on_cell == false)
      {
        neighbours.push(case_gauche)
      }
    }

    // Cas dernière ligne
    else if(case_courante.posX == tailleLaby-1)
    {
      case_haut = {posX:case_courante.posX-1, posY:case_courante.posY};
      if (labyrinthe[case_haut.posX][case_haut.posY].walls[2] == false && labyrinthe[case_haut.posX][case_haut.posY].rice_on_cell == false)
      {
        neighbours.push(case_haut)
      }
      
      case_droite = {posX:case_courante.posX, posY:case_courante.posY+1};
      if (labyrinthe[case_droite.posX][case_droite.posY].walls[3] == false && labyrinthe[case_droite.posX][case_droite.posY].rice_on_cell == false)
      {
        neighbours.push(case_droite)
      }

      case_gauche = {posX:case_courante.posX, posY:case_courante.posY-1};
      if (labyrinthe[case_gauche.posX][case_gauche.posY].walls[1] == false && labyrinthe[case_gauche.posX][case_gauche.posY].rice_on_cell == false)
      {
        neighbours.push(case_gauche)
      }
    }

    // Cas première colonne
    else if(case_courante.posY == 0)
    {
      case_haut = {posX:case_courante.posX-1, posY:case_courante.posY};
      if (labyrinthe[case_haut.posX][case_haut.posY].walls[2] == false && labyrinthe[case_haut.posX][case_haut.posY].rice_on_cell == false)
      {
        neighbours.push(case_haut)
      }
      
      case_droite = {posX:case_courante.posX, posY:case_courante.posY+1};
      if (labyrinthe[case_droite.posX][case_droite.posY].walls[3] == false && labyrinthe[case_droite.posX][case_droite.posY].rice_on_cell == false)
      {
        neighbours.push(case_droite)
      }

      case_bas = {posX:case_courante.posX+1, posY:case_courante.posY};
      if(labyrinthe[case_bas.posX][case_bas.posY].walls[0] == false && labyrinthe[case_bas.posX][case_bas.posY].rice_on_cell == false)
      {
        neighbours.push(case_bas)
      }
    }

    // Cas dernière colonne
    else if(case_courante.posY == tailleLaby-1)
    {
      case_haut = {posX:case_courante.posX-1, posY:case_courante.posY};
      if (labyrinthe[case_haut.posX][case_haut.posY].walls[2] == false && labyrinthe[case_haut.posX][case_haut.posY].rice_on_cell == false)
      {
        neighbours.push(case_haut)
      }

      case_gauche = {posX:case_courante.posX, posY:case_courante.posY-1};
      if (labyrinthe[case_gauche.posX][case_gauche.posY].walls[1] == false && labyrinthe[case_gauche.posX][case_gauche.posY].rice_on_cell == false)
      {
        neighbours.push(case_gauche)
      }
      
      case_bas = {posX:case_courante.posX+1, posY:case_courante.posY};
      if(labyrinthe[case_bas.posX][case_bas.posY].walls[0] == false && labyrinthe[case_bas.posX][case_bas.posY].rice_on_cell == false)
      {
        neighbours.push(case_bas)
      }
    }

    // Sinon
    else{
      case_bas = {posX:case_courante.posX+1, posY:case_courante.posY};
      if(labyrinthe[case_bas.posX][case_bas.posY].walls[0] == false && labyrinthe[case_bas.posX][case_bas.posY].rice_on_cell == false)
      {
        neighbours.push(case_bas)
      }

      case_haut = {posX:case_courante.posX-1, posY:case_courante.posY};
      if (labyrinthe[case_haut.posX][case_haut.posY].walls[2] == false && labyrinthe[case_haut.posX][case_haut.posY].rice_on_cell == false)
      {
        neighbours.push(case_haut)
      }

      case_droite = {posX:case_courante.posX, posY:case_courante.posY+1};
      if (labyrinthe[case_droite.posX][case_droite.posY].walls[3] == false && labyrinthe[case_droite.posX][case_droite.posY].rice_on_cell == false)
      {
        neighbours.push(case_droite)
      }
      
      case_gauche = {posX:case_courante.posX, posY:case_courante.posY-1};
      if (labyrinthe[case_gauche.posX][case_gauche.posY].walls[1] == false && labyrinthe[case_gauche.posX][case_gauche.posY].rice_on_cell == false)
      {
        neighbours.push(case_gauche)
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

