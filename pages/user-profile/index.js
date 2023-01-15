const UserProfilePage = (props) => {
  return <h1>{props.username}</h1>;
};

export const getServerSideProps = async (context) => {
  return {
    props: {
      username: "Pratik",
    },
  };
};
export default UserProfilePage;
