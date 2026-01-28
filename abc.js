/**
 * Step 1: Simulates clicking on an image
 * @returns {Promise<string>} A promise that resolves with a message about clicking the image
 */
function step1()
{
    return new Promise((resolve,reject)=>{
        resolve('Clicking the image')
    })
}
/**
 * Step 2: Simulates adding filters to the clicked image
 * @param {string} clickedImage - The result from step1 (image click action)
 * @returns {Promise<string>} A promise that resolves with a message about adding filters
 */
function step2(clickedImage) 
{
    return new Promise((resolve,reject)=>{
        resolve('Adding Filters')
    })
}
/**
 * Step 3: Simulates updating captions for the filtered image
 * @param {string} filteredImage - The result from step2 (filtered image action)
 * @returns {Promise<string>} A promise that resolves with a message about updating captions
 */
function step3(filteredImage)
{
    return new Promise((resolve,reject)=>{
        resolve('Updating Captions')
    })
}
/**
 * Step 4: Simulates sharing the captioned image online
 * @param {string} captionedImage - The result from step3 (captioned image action)
 * @returns {Promise<string>} A promise that resolves with a message about sharing the image
 */
function step4(captionedImage)
{
    return new Promise((resolve,reject)=>{
        resolve('Sharing the image Online')
    })
}

// APPROACH 1: Nested Promise Chaining (Pyramid of Doom)
// This approach demonstrates deeply nested promises which can be hard to read and maintain
// Each .then() creates a new level of indentation, making the code difficult to follow

step1()
.then((data)=>{
    // First level: Handle step1 result
    step2(data)
    .then((data)=>{
        // Second level: Handle step2 result
        step3(data)
        .then((data)=>{
            // Third level: Handle step3 result
            step4(data)
            .then((data)=>{
                // Fourth level: Final result - log the completion message
                console.log(data);
            })
            .catch((err)=>{
                // Error handling for step4
                console.log("Something Went Wrong",err);
            })
        })
        .catch((err)=>{
            // Error handling for step3
            console.log("Something Went Wrong",err);
        })
    })
    .catch((err)=>{
        // Error handling for step2
        console.log("Something Went Wrong",err);
    })
})
.catch((err)=>{
    // Error handling for step1
    console.log("Something Went Wrong",err);
})



// APPROACH 2: Flat Promise Chaining (Better Approach)
// This approach demonstrates flattened promise chains which are much more readable
// Key improvement: Each .then() returns a promise, allowing the chain to continue flat
// Note: The .catch() at the end handles errors from any step in the chain

step1()
.then((data)=>{
    // Handle step1 result and return the next promise
    return step2(data);
})
.then((data)=>{
    // Handle step2 result and return the next promise
    return step3(data);
})
.then((data)=>{
    // Handle step3 result and return the final promise
    return step4(data)
})
.then((data)=>{
    // Final result: All steps completed successfully
    console.log('All tasks completed', data);
})
.catch() // Note: This catch block is empty - should have error handling


// APPROACH 3: Async/Await (Modern & Clean Approach)
// This approach demonstrates the modern async/await syntax
// Benefits: 
// - Code looks synchronous and is very readable
// - Error handling is simplified with try/catch blocks
// - Easy to debug and maintain

/**
 * Executes all image processing steps using async/await pattern
 * This function demonstrates the cleanest way to handle sequential async operations
 */
async function tasks()
{
    try{ 
        // Wait for step1 to complete (image click)
        const image = await step1();
        console.log(image);
        
        // Wait for step2 to complete (add filters)
        const filtered = await step2(image);
        console.log(filtered);
        
        // Wait for step3 to complete (update captions)
        const captioned = await step3(filtered);
        console.log(captioned);
        
        // Wait for step4 to complete (share online)
        const posted = await step4(captioned);
        console.log(posted);
    }
    catch{
        // Single error handler catches any errors from the entire sequence
        console.log("Something Went Wrong");
    }
}