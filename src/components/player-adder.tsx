import { useState } from "react"
import { useMutation, useQueryClient } from "react-query";
import { addPlayer, PlayerInput } from "../api/player-request";

type FormData = {
    fname: string,
    lname: string,
    height: number 
    weight: number
}

export function CreatePlayer(){

    const [form, setForm] = useState<FormData>({fname:"", lname:"",height:0, weight:0});
    const [isVisible,setVisible] = useState<boolean>(false);
    const queryClient = useQueryClient();

    const addPlayerMutation = useMutation(addPlayer, {
        onSuccess: () =>{
            setVisible(true);
            queryClient.invalidateQueries("playercache")
        }
    });

    function submitPlayer(){
        const playerInput: PlayerInput = {
            fname: form.fname,
            lname: form.lname,
            heightInches: form.height,
            weightLbs: form.weight
        }
        addPlayerMutation.mutate(playerInput);
    }


    return <>
        <fieldset>
            <legend>Create New Player</legend>
            <input type="text" placeholder="John" onChange={e => setForm({...form, fname:e.target.value})}/>
            <input type="text" placeholder="Smith" onChange={e => setForm({...form, lname: e.target.value})}/>
            <input type="number" placeholder="72" onChange={e => setForm({...form, height:Number(e.target.value)})}/>
            <input type="number" placeholder="200" onChange={e => setForm({...form, weight:Number(e.target.value)})}/>
        </fieldset>
        <button onClick={submitPlayer}>Add Player</button>

        {isVisible ? <h5>Player Created</h5> : <> </> }
        
    </>
}