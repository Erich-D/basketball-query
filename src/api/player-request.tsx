import { UpdateForm } from "../components/player-updater";

export const jsonInitState: string = `{
    "playerId": 0,
    "fname": "",
    "lname": "",
    "bioMetrics": {
      "heightInches": 0,
      "weightLbs": 0
    },
    "careerStats": {
      "shotAttempts": 0,
      "madeBaskets": 0,
      "rebounds": 0,
      "assists": 0,
      "blocks": 0
    }
  }`

export const  jsonPlayerFormDef: string =  `{
    "firstName": "",
    "lastName": "",
    "heightInInches": 0,
    "weightInLbs": 0,
    "shotAttempts": 0,
    "madeBaskets": 0,
    "rebounds": 0,
    "assists": 0,
    "blocks": 0
}`

export const  jsonFormDef: string =  `{
    "player": {
    "firstName": "Joe",
    "lastName": "Smith"
    },
    "bioMetrics": {
        "heightInInches": 78,
        "weightInLbs": 200
    },
    "careerStats": {
        "shotAttempts": 789,
        "madeBaskets": 523,
        "rebounds": 356,
        "assists": 235,
        "blocks": 68
    }
}`    

// Generated by https://quicktype.io

export type PlayerForm = {
    firstName:        string;
    lastName:        string;
    heightInInches: number;
    weightInLbs:    number;
    shotAttempts: number;
    madeBaskets:  number;
    rebounds:     number;
    assists:      number;
    blocks:       number;
}


  // Generated by https://quicktype.io

export type BasketballPlayer = {
    playerId:    number;
    fname:       string;
    lname:       string;
    bioMetrics:  BioMetrics;
    careerStats: CareerStats;
}

export type BioMetrics = {
    heightInches: number;
    weightLbs:    number;
}

export type CareerStats = {
    shotAttempts: number;
    madeBaskets:  number;
    rebounds:     number;
    assists:      number;
    blocks:       number;
}

export type BasketballPlayerCreation = {
    fname:       string;
    lname:       string;
    bioMetrics:  BioMetrics;
    careerStats: CareerStats;
}

export async function getAllPlayers():Promise<BasketballPlayer[]>{
    const httpResponse = await fetch("http://127.0.0.1:8000/players");
    const players: BasketballPlayer[] = await httpResponse.json();
    return players;
}

export async function createPlayer(basketballPlayer: BasketballPlayerCreation):Promise<BasketballPlayer>{
    const httpResponse = await fetch("http://127.0.0.1:8000/players", {
        method:"POST",
        body:JSON.stringify(basketballPlayer),
        headers:{"Content-Type":"application/json"}
    });

    const newPlayer = await httpResponse.json();
    return newPlayer;
}

export async function getAllPlayerIds():Promise<BasketballPlayer[]>{
    const query = `query MyQuery {
        players {
          playerId
          lname
          fname
        }
      }`

      const body = JSON.stringify({query:query})

      const httpResponse = await fetch("http://127.0.0.1:8000/graphql", {method:"POST", body, headers:{"Content-Type":"application/json"}});
      const responseBody = await httpResponse.json();
      const players:BasketballPlayer[] = responseBody.data.players
      return players
}

export async function getAllPlayerStats():Promise<BasketballPlayer[]>{

    const query = `query getPlayerStats {
        players {
          fname
          lname
          careerStats {
            assists
            blocks
            madeBaskets
            rebounds
            shotAttempts
          }
        }
      }`

    //const variables = {lnameToSearch:lname}
    const body = JSON.stringify({query:query})

    const httpResponse = await fetch("http://127.0.0.1:8000/graphql", {method:"POST", body, headers:{"Content-Type":"application/json"}});
    const responseBody = await httpResponse.json();
    const players:BasketballPlayer[] = responseBody.data.players
    return players
}

export async function updatePlayer(player: UpdateForm):Promise<BasketballPlayer>{
    const query = `mutation MyMutation {
        mergeStats(
          input: {playerId: ${player.playerId}, assists: ${player.assists}, blocks: ${player.blocks}, madeBaskets: ${player.madeBaskets}, rebounds: ${player.rebounds}, shotAttempts: ${player.shotAttempts}}
        ) {
          ... on BaksetballPlayer {
            playerId
          }
          ... on PlayerDoesNotExist {
            message
            playerId
          }
        }
      }`

    const body = JSON.stringify({query:query})
      console.log(body)
    const httpResponse = await fetch("http://127.0.0.1:8000/graphql", {method:"POST", body, headers:{"Content-Type":"application/json"}});
    const responseBody = await httpResponse.json();
    const players:BasketballPlayer = responseBody.data;
    return players
}
