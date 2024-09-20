import { dislikeTrack, likeTrack } from "@/app/components/api/tracks";
import { useAppDispatch, useAppSelector } from "@/hooks";
import { setDisLikeTrack, setLikeTrack } from "@/store/features/playlistSlice";

const useLikeTrack = (trackId: number) => {
  const dispatch = useAppDispatch();

  const tokens = useAppSelector((state) => state.auth.tokens);

  const likedTracks = useAppSelector(
    (state) => state.playlist.favoriteTracksList
  );

  // Найдем трек по его ID
  const track = likedTracks.find((track) => track._id === trackId);
  const isLiked = !!track;

  const handleLike = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!tokens.access || !tokens.refresh) {
      return alert("Вы не авторизованы!");
    }

    const action = isLiked ? dislikeTrack : likeTrack;

    try {
      await action({
        trackId: trackId,
        access: tokens.access,
        refresh: tokens.refresh,
      });

      if (isLiked && track) {
        dispatch(setDisLikeTrack(track)); // передаем объект трека
      } else if (track) {
        dispatch(setLikeTrack(track)); // передаем объект трека
      }
    } catch (error) {
      // Проверяем, что error является объектом и содержит поле response
      if (typeof error === "object" && error !== null && "response" in error) {
        const response = (error as { response: { status: number } }).response;
        if (response.status === 401) {
          console.log("Срок действия токена истек. Обновление токена...");
        }
      } else {
        throw new Error("Произошла ошибка");
      }
    }
  };

  return { handleLike, isLiked };
};

export default useLikeTrack;
