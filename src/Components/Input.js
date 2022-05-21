import { useState } from "react";
const { Configuration, OpenAIApi } = require("openai");

const Input = () => {
    const [topic, setTopic] = useState('');
    const [question, setQuestion] = useState('');
    const [list, setList] = useState([]);

    const addPrompt = (e) =>{
        e.preventDefault();
        const configuration = new Configuration({
            //use process.env later
          apiKey: `${process.env.REACT_APP_OPENAI_API_KEY}`,
        });

        const openai = new OpenAIApi(configuration);
        
        const response = openai.createCompletion("text-curie-001", {
          prompt: `${question} ${topic}`,
          temperature: 0.7,
          max_tokens: 256,
          top_p: 1,
          frequency_penalty: 0,
          presence_penalty: 0,
        })
        .then((response) =>{
            const advice = response.data.choices[0].text;
            const id = Date.now();
            const time = new Date(id).toDateString();
            const overall_question = `${question} ${topic}`
            console.log(advice);
            setList([{id, overall_question, advice, time},...list])
        })
      }

    return ( 
        <div>
            <div className="create">
                <form onSubmit={addPrompt}>
                    <label>Your Question</label>
                    <select
                    value={question}
                    onChange = {(e)=> setQuestion(e.target.value)}>
                        <option value="Give me general advice on">Give me general advice on...</option>
                        <option value="Tell me everything you know about">Tell me everything you know about...</option>
                        <option value="Tell me a story about">Tell me a story about...</option>
                        <option value="Write me a poem about">Write me a poem about...</option>
                    </select>

                    <label>Your Topic</label>
                    <input required type="text" value={topic} onChange ={(e)=>setTopic(e.target.value)} placeholder ="Give me general advice on..."></input>
                    <button>Submit</button>
                </form>
            </div>
            <div>
            {list.map(entry => (
                <div className="card" key={entry.id}>
                    <h1>{entry.overall_question}</h1>
                    <p>{entry.advice}</p>
                    <p> - {entry.time}</p>
                </div>
            ))}
        </div>
    </div>
     );
}
 
export default Input;


