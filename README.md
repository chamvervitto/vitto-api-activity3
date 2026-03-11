#RESTful API Activity - [YOUR NAME HERE]

##Best Practices Implementation

#1. Environment Variables
Why did we put BASE_URI in .env instead of hardcoding it?
Answer: We use .env files to allow API settings (such as ports or URLs) to be easily modified without changing the actual source code. This practice also enhances security by keeping sensitive configuration details out of the main logic.

#2. Resource Modeling
Why did we use plural nouns (e.g., /dishes) for our routes?
Answer: Using plural nouns is a standard convention in REST API design to indicate that the endpoint refers to a "collection" or a group of data rather than a single individual item.

#3. Status Codes
When do we use 201 Created vs 200 OK?
Answer: 201 Created is used when a request successfully results in the creation of a new resource (e.g., adding a new dish). 200 OK is used for successful requests that do not involve creating new data, such as reading or retrieving information.
Why is it important to return 404 instead of just an empty array or a generic error?
Answer: Returning a 404 Not Found status explicitly informs the user or developer that the specific resource they are looking for does not exist on the server. This is more informative than a generic error or an empty response.

#4. Testing
Screenshot of a successful GET request:
![Successful GET Request]([http://localhost:3000/api/v1/dishes])
Sent
Write to
