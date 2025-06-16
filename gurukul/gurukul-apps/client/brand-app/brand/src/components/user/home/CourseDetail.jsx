import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Clock, CheckCircle, PlayCircle, Users } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import VideoPlayer from './VideoPlayer';
import { getSinglePlaylist } from '../../../redux/api/playlistAPI';

const CourseDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { branding } = useSelector((state) => state.brandDetails);
  const course = useSelector((state) => state.playlist.singlePlaylist);

  const [currentVideo, setCurrentVideo] = useState(null);
  const [playerKey, setPlayerKey] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        await dispatch(
          getSinglePlaylist({
            dispatch,
            brandId: branding.brandId,
            playlistId: id,
          })
        );
      } catch (err) {
        console.error('Error fetching playlist:', err);
        navigate('/user/home');
      } finally {
        setLoading(false);
      }
    };

    fetchCourse();
  }, [id, branding.brandId, dispatch, navigate]);

  useEffect(() => {
    if (course?.videos?.length > 0) {
      setCurrentVideo(course.videos[0]);
    }
  }, [course]);

  const handleVideoSelect = (video) => {
    setCurrentVideo(video);
    setPlayerKey((prev) => prev + 1); // force re-render
  };

  if (loading) {
    return <div className="text-center mt-10">Loading course...</div>;
  }

  if (!course || !course.videos || course.videos.length === 0) {
    navigate('/user/home');
    return null;
  }

  const completedVideos = course.videos.filter(
    (video) => video.completed
  ).length;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate(-1)}
              className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
            >
              <ArrowLeft className="h-5 w-5" />
              <span>Back to Courses</span>
            </button>
            <div className="h-6 w-px bg-gray-300" />
            <div>
              <h1 className="text-xl font-bold text-gray-900">
                {course.title}
              </h1>
              <div className="flex items-center gap-4 text-sm text-gray-600 mt-1">
                <span>{course.instructor}</span>
                <div className="flex items-center gap-1">
                  <Users className="h-4 w-4" />
                  <span>{course.lessonsCount} lessons</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  <span>{course.duration}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Video Section */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="aspect-video bg-black">
                <VideoPlayer
                  key={playerKey}
                  src={currentVideo.url}
                  poster={currentVideo.thumbnail}
                />
              </div>
              <div className="p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  {currentVideo.title}
                </h2>
                <p className="text-gray-600 mb-4">{currentVideo.description}</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4 text-sm text-gray-500">
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      <span>{currentVideo.duration}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {currentVideo.completed ? (
                      <div className="flex items-center gap-1 text-green-600">
                        <CheckCircle className="h-5 w-5" />
                        <span className="text-sm font-medium">Completed</span>
                      </div>
                    ) : (
                      <button
                        className="px-4 py-2 rounded-lg text-sm font-medium text-white transition-colors"
                        style={{ backgroundColor: branding.brandColor }}
                        onMouseEnter={(e) =>
                          (e.currentTarget.style.backgroundColor =
                            branding.secondaryColor)
                        }
                        onMouseLeave={(e) =>
                          (e.currentTarget.style.backgroundColor =
                            branding.brandColor)
                        }
                      >
                        Mark as Complete
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Progress */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">
                Course Progress
              </h3>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-gray-600">
                      Overall Progress
                    </span>
                    <span className="text-sm font-medium text-gray-900">
                      {course.progress}%
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div
                      className="h-3 rounded-full transition-all duration-300"
                      style={{
                        width: `${course.progress}%`,
                        background: `linear-gradient(to right, ${branding.brandColor}, ${branding.secondaryColor})`,
                      }}
                    />
                  </div>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">
                    {completedVideos} of {course.videos.length} lessons
                    completed
                  </span>
                </div>
              </div>
            </div>

            {/* Video List */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">
                Course Content
              </h3>
              <div className="space-y-2">
                {course.videos.map((video, index) => (
                  <div
                    key={video.id}
                    className={`p-3 rounded-lg cursor-pointer transition-all duration-200 border-2 ${
                      currentVideo.id === video.id
                        ? 'border-2'
                        : 'hover:bg-gray-50 border-transparent'
                    }`}
                    style={
                      currentVideo.id === video.id
                        ? {
                            backgroundColor: branding.brandColor + '10',
                            borderColor: branding.brandColor + '40',
                          }
                        : {}
                    }
                    onClick={() => handleVideoSelect(video)}
                  >
                    <div className="flex items-center gap-3">
                      {video.completed ? (
                        <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                      ) : (
                        <PlayCircle className="h-5 w-5 text-gray-400 flex-shrink-0" />
                      )}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-1">
                          <h4
                            className={`text-sm font-medium truncate ${
                              currentVideo.id === video.id
                                ? ''
                                : 'text-gray-900'
                            }`}
                            style={
                              currentVideo.id === video.id
                                ? { color: branding.brandColor }
                                : {}
                            }
                          >
                            {index + 1}. {video.title}
                          </h4>
                        </div>
                        <div className="flex items-center gap-2 text-xs text-gray-500">
                          <Clock className="h-3 w-3" />
                          <span>{video.duration}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetail;
