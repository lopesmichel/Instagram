import "./Home.css";

// components
import LikeContainer from "../../components/LikeContainer";
import PhotoItem from "../../components/PhotoItem";
import { Link } from "react-router-dom";

// hooks
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useResetComponentMessage } from "../../hooks/useResetComponentMessage";

// Redux
import { getPhotos, like } from "../../slices/photoSlice";

const Home = () => {
  const dispatch = useDispatch();

  const resetMessage = useResetComponentMessage(dispatch);

  const { user } = useSelector((state) => state.auth);
  const { photos, loading } = useSelector((state) => state.photo);

  // Carregar todas as fotos ao montar o componente
  useEffect(() => {
    if (user && user.token) {
      dispatch(getPhotos(user.token));
    }
  }, [dispatch, user]);
  
  const handleLike = (photo) => {
    if (!photo?._id) return;  
    dispatch(like(photo._id));
    resetMessage();
  };

  if (loading) {
    return <p>Carregando...</p>;
  }

  return (
    <div id="home">
      {/* Lista de fotos */}
      {Array.isArray(photos) &&
        photos.length > 0 &&
        photos.map((photo) => (
          <div key={photo._id}>
            <PhotoItem photo={photo} />
            <LikeContainer photo={photo} user={user} handleLike={handleLike} />
            <Link className="btn" to={`/photos/${photo._id}`}>
              Ver mais
            </Link>
          </div>
        ))}

      {/* Nenhuma foto publicada */}
      {Array.isArray(photos) && photos.length === 0 && user?.userId && (
        <h2 className="no-photos">
          Ainda não há fotos publicadas,{" "}
          <Link to={`/users/${user.userId}`}>clique aqui</Link> para começar.
        </h2>
      )}
    </div>
  );
};

export default Home;
