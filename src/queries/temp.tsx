// import { FaceBookPostsData } from "@/types/facebook";
// import { useState, useEffect } from "react";

const MetaPageInfo = () => {
  const posts = [
    {
      created_time: "2024-10-01T10:50:09+0000",
      message: "This hackathon is teaching us a lot",
      id: "122100353528550580_122100464114550580",
    },
    {
      created_time: "2024-10-01T08:19:57+0000",
      message: "This hackathon is lit",
      id: "122100353528550580_122100379754550580",
    },
    {
      created_time: "2024-10-01T07:36:40+0000",
      message: "Yabe dabi dooo",
      id: "122100353528550580_122100356852550580",
    },
    {
      created_time: "2002-12-18T08:00:00+0000",
      message: "Yabe dabi dooo",
      id: "122100353528550580_122100337370550580",
    },
  ]
  // const [posts, setPosts] = useState<FaceBookPostsData[]>([
  //   {
  //     created_time: "2024-10-01T10:50:09+0000",
  //     message: "This hackathon is teaching us a lot",
  //     id: "122100353528550580_122100464114550580",
  //   },
  //   {
  //     created_time: "2024-10-01T08:19:57+0000",
  //     message: "This hackathon is lit",
  //     id: "122100353528550580_122100379754550580",
  //   },
  //   {
  //     created_time: "2024-10-01T07:36:40+0000",
  //     message: "Yabe dabi dooo",
  //     id: "122100353528550580_122100356852550580",
  //   },
  //   {
  //     created_time: "2002-12-18T08:00:00+0000",
  //     message: "Yabe dabi dooo",
  //     id: "122100353528550580_122100337370550580",
  //   },
  // ]);
  // const [loading, setLoading] = useState(false);
  // const [error, setError] = useState(null);

  // useEffect(() => {
  //   // Define the endpoint and the access token
  //   const accessToken = '12'; // Replace 'LOL' with your actual access token
  //   const pageId = '122100353528550580'; // The page ID provided in the URL
  //   const url = `https://graph.facebook.com/v20.0/${pageId}/posts?access_token=${accessToken}`;

  //   // Fetch the data from the REST API
  //   fetch(url)
  //     .then((response) => {
  //       if (!response.ok) {
  //         throw new Error(`HTTP error! status: ${response.status}`);
  //       }
  //       return response.json();
  //     })
  //     .then((data) => {
  //       setPosts(data.data); // Set the fetched posts data
  //       console.log(data.data)
  //       setLoading(false);
  //     })
  //     .catch((error) => {
  //       setError(error.message);
  //       setLoading(false);
  //     });
  // }, []);

  // if (loading) return <p>Loading...</p>;
  // if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h1>Page Posts</h1>
      <ul>
        {posts.map((post) => (
          <li key={post.id}>{post.message ? post.message : "No Message"}</li>
        ))}
      </ul> 
    </div>
  );
};

export default MetaPageInfo;
