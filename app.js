const express = require("express")
const axios = require("axios")
const main = require("./main")
const app = express()
const port = 4000


app.get('/api/classify-number/:num', async (req, res) => {
    const num = Number(req.params.num)

    if (isNaN(num)) {
        return res.status(400).json({
            number: req.params.num,
            error: true
        })
    }

    let funFact;
    try {
        const response = await axios.get(
          `http://numbersapi.com/${num}/math?json`
        );
        funFact = response.data.text
    } catch (error) {
        funFact = "No fun fact available for this nmber"
    }

      if (main.isArmStrong(num)) {
        funFact = main.getArmstrongFact(num);
      }

      const response = {
        number: num,
        is_prime: main.isPrime(num),
        is_perfect: main.isPerfect(num),
        properties: [],
        digit_sum: main.getDigitSum(num),
        fun_fact: funFact,
      };

      
      if (main.isArmStrong(num)) response.properties.push("armstrong");
      response.properties.push(main.getParity(num));

      res.json(response);

})



app.listen(port, ()=> {
    console.log(`we are listening to port ${port}`)
})