import { useState, useEffect } from 'react';

const MetaPageInfo = () => {
  const [posts, setPosts] = useState<any>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Define the endpoint and the access token
    const accessToken = 'EAAIfBSQza0IBO3tZBnmdyFBoTCiYEJwtQCaY88g2ePhhq6v3dBbZBBdRruvknZCMo3KcacsFcQ0qa3LRL8XbNV6ZBcnK8Q7cZBpuHVHglsDDhxbbqLBMtMQHKIbcLVXWBH4TXaHYRukGKW0rV0z3znQN6vRjJOPDZBPrumCAPkG4uDOlw87HRUlcuBhMR5CSZBvufSHtr7JpWjp4jdOmruREN9AeAV3'; // Replace 'LOL' with your actual access token
    const pageId = '122100353528550580'; // The page ID provided in the URL
    const url = `https://graph.facebook.com/v20.0/${pageId}/posts?access_token=${accessToken}`;

    // Fetch the data from the REST API
    fetch(url)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        setPosts(data.data); // Set the fetched posts data
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h1>Page Posts</h1>
      <ul>
        {posts.map((post: any) => (
          <li key={post.id}>{post.message ? post.message : 'No Message'}</li>
        ))}
      </ul>
    </div>
  );
};

export default MetaPageInfo;
