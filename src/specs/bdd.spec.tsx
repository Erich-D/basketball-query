import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event";
import App from "../App"



test("It should show off players fname,lname and career stats", async ()=>{


    render(<App/>);// rendering my app function

    
    const table = await screen.findByRole("table");
    const options = await screen.findAllByRole("columnheader");

    const header1 = await screen.findAllByText(/Player Name/);
    const header2 = await screen.findAllByText(/Assists/);
    const player1 = await screen.findAllByText(/Blocks/);
    const player2 = await screen.findAllByText(/Marcus/);
})

test("It should be able to update player stats", async () => {

    render(<App/>)

    const testData: HTMLTableRowElement = await screen.findByTestId("Billy");
    console.log(testData.children.item(1)?.innerHTML);
    // checking to see if the elements are there
    const selectPlayer: HTMLSelectElement = await screen.findByTestId("idInput");
    const shotAttemptsInput: HTMLInputElement = await screen.findByPlaceholderText("10");
    const basketsMadeInput: HTMLInputElement = await screen.findByPlaceholderText("12");
    const reboundsInput: HTMLInputElement = await screen.findByPlaceholderText("16");
    const assitsInput: HTMLInputElement = await screen.findByPlaceholderText("15");
    const blocksInput: HTMLInputElement = await screen.findByPlaceholderText("18");
    const addButton: HTMLButtonElement = await screen.findByText(/Update Player/);
    
    // interact with elements like a user
    userEvent.selectOptions(selectPlayer,["10001"]);
    userEvent.type(shotAttemptsInput,"23");
    userEvent.type(basketsMadeInput,"25");
    userEvent.type(reboundsInput,"80");
    userEvent.type(assitsInput,"62");
    userEvent.type(blocksInput,"66");
    userEvent.click(addButton);

    const selected: HTMLOptionElement = await screen.findByRole("option", {name: 'Billy McBrickshot'});

    expect(selected.selected).toBe(true);
    expect(shotAttemptsInput).toHaveValue(23);
    expect(basketsMadeInput).toHaveValue(25);
    expect(reboundsInput).toHaveValue(80);
    expect(assitsInput).toHaveValue(62);
    expect(blocksInput).toHaveValue(66);
    //const createdHeading = await screen.findByText(/Player Created/);
    console.log(testData.children.item(1)?.innerHTML);
    //check that the person added is on the screen
    //const frank = await screen.findByText(/Frank/);

})