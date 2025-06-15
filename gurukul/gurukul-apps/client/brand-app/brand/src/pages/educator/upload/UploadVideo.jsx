import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import {
  BookOpen,
  Plus,
  Video,
  Users,
  ArrowLeft,
  Save,
  Upload as UploadIcon,
  Play,
  Edit3,
  MoreHorizontal,
  Star,
  Clock,
  Eye,
  FileVideo,
  Image as ImageIcon,
  Calendar,
  CheckCircle,
  Home,
} from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import {
  addVideosToPlayList,
  createPlaylist,
} from '../../../redux/api/playlistAPI';
import { uploadVideo } from '../../../redux/api/videoAPI';

export const UploadVideo = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const courseId = searchParams.get('courseId');

  const [currentView, setCurrentView] = useState('create-course');
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [playListId, setPlayListId] = useState(null);
  const { branding } = useSelector((state) => state.brandDetails);
  const dispatch = useDispatch();

  // Course form state
  const [courseForm, setCourseForm] = useState({
    name: '',
    description: '',
    thumbnail: '',
    created_by_educator: '',
    created_by_founder: '',
  });

  // Video form state
  const [videoForm, setVideoForm] = useState({
    title: '',
    description: '',
    videoFile: null,
    thumbnail: null,
  });
  console.log(videoForm.videoFile);

  function darken(hex, factor = 0.1) {
    const f = parseInt(hex.slice(1), 16);
    const t = 0; // black
    const R = f >> 16;
    const G = (f >> 8) & 0x00ff;
    const B = f & 0x0000ff;
    return (
      '#' +
      (
        0x1000000 +
        (Math.round((1 - factor) * R) << 16) +
        (Math.round((1 - factor) * G) << 8) +
        Math.round((1 - factor) * B)
      )
        .toString(16)
        .slice(1)
    );
  }

  const [courses, setCourses] = useState([
    {
      id: '1',
      name: 'React Fundamentals',
      description:
        'Master the basics of React development with hands-on projects and real-world examples',
      thumbnail:
        'https://images.pexels.com/photos/11035380/pexels-photo-11035380.jpeg?auto=compress&cs=tinysrgb&w=500',
      videos: [
        {
          id: 'v1',
          title: 'Introduction to React',
          description: 'Learn the basics of React components',
          duration: '15:30',
          views: 1250,
          uploadDate: '2024-01-15',
          thumbnail:
            'https://images.pexels.com/photos/11035471/pexels-photo-11035471.jpeg?auto=compress&cs=tinysrgb&w=300',
          videoUrl: '',
        },
      ],
      students: 248,
      rating: 4.8,
      duration: '8h 30m',
      lastUpdated: '2 days ago',
      status: 'published',
      created_by_educator: 'educator123',
    },
    {
      id: '2',
      name: 'Advanced JavaScript',
      description:
        'Deep dive into modern JavaScript concepts and best practices',
      thumbnail:
        'https://images.pexels.com/photos/11035471/pexels-photo-11035471.jpeg?auto=compress&cs=tinysrgb&w=500',
      videos: [],
      students: 156,
      rating: 4.9,
      duration: '6h 15m',
      lastUpdated: '1 week ago',
      status: 'published',
      created_by_educator: 'educator123',
    },
  ]);

  // Check if we're managing an existing course
  useEffect(() => {
    if (courseId) {
      const course = courses.find((c) => c.id === courseId);
      if (course) {
        setSelectedCourse(course);
        setCurrentView('course-detail');
        setCurrentStep(3);
      }
    }
  }, [courseId, courses]);

  const steps = [
    {
      number: 1,
      title: 'Create Course',
      description: 'Basic course information',
    },
    { number: 2, title: 'Upload Videos', description: 'Add course content' },
    { number: 3, title: 'Complete', description: 'Review and publish' },
  ];

  const handleCreateCourse = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const newCourse = {
        id: Date.now().toString(),
        name: courseForm.name,
        description: courseForm.description,
        thumbnail:
          courseForm.thumbnail ||
          'https://images.pexels.com/photos/11035540/pexels-photo-11035540.jpeg?auto=compress&cs=tinysrgb&w=500',
        videos: [],
        students: 0,
        rating: 0,
        duration: '0h 0m',
        lastUpdated: 'Just now',
        status: 'draft',
        created_by_educator:
          courseForm.created_by_educator || 'current-educator',
      };
      const data = {
        name: newCourse.name,
        description: newCourse.description,
      };
      dispatch(
        createPlaylist({ dispatch, data, brandId: branding.brandId })
      ).then((res) => {
        if (res.payload.statusCode < 400) {
          setPlayListId(res.payload.data._id);
          setCourses((prev) => [newCourse, ...prev]);
          setSelectedCourse(newCourse);
          setCurrentStep(2);
          setCurrentView('course-created');
        }
      });
    } catch (error) {
      console.error('Error creating course:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleUploadVideo = async (e) => {
    e.preventDefault();
    if (!selectedCourse) return;

    setIsSubmitting(true);
    const formData = new FormData();
    formData.append('title', videoForm.title);
    formData.append('video', videoForm.videoFile);
    try {
      dispatch(
        uploadVideo({ dispatch, data: formData, brandId: branding.brandId })
      ).then((res) => {
        dispatch(
          addVideosToPlayList({
            dispatch,
            data: { videos: [res.payload.data._id] },
            brandId: branding.brandId,
            playlistId: playListId,
          })
        );
      });
      const newVideo = {
        id: Date.now().toString(),
        title: videoForm.title,
        description: videoForm.description,
        duration: '10:30',
        views: 0,
        uploadDate: new Date().toISOString().split('T')[0],
        thumbnail:
          'https://images.pexels.com/photos/11035540/pexels-photo-11035540.jpeg?auto=compress&cs=tinysrgb&w=300',
        videoUrl: 'uploaded-video-url',
      };

      setCourses((prev) =>
        prev.map((course) =>
          course.id === selectedCourse.id
            ? { ...course, videos: [...course.videos, newVideo] }
            : course
        )
      );

      setSelectedCourse((prev) =>
        prev ? { ...prev, videos: [...prev.videos, newVideo] } : null
      );
      setVideoForm({
        title: '',
        description: '',
        videoFile: null,
        thumbnail: null,
      });
      setCurrentView('video-uploaded');
    } catch (error) {
      console.error('Error uploading video:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderStepper = () => (
    <div className="mb-8">
      <div className="flex items-center justify-center">
        {steps.map((step, index) => (
          <div key={step.number} className="flex items-center">
            <div className="flex flex-col items-center">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center font-medium text-sm ${
                  currentStep > step.number
                    ? 'text-white'
                    : currentStep === step.number
                      ? 'text-white'
                      : 'bg-gray-200 text-gray-600'
                }`}
                style={
                  currentStep > step.number || currentStep === step.number
                    ? { backgroundColor: branding.brandColor }
                    : {}
                }
              >
                {currentStep > step.number ? (
                  <CheckCircle className="w-5 h-5" />
                ) : (
                  step.number
                )}
              </div>
              <div className="mt-2 text-center">
                <p
                  className={`text-sm font-medium ${
                    currentStep >= step.number
                      ? 'text-gray-900'
                      : 'text-gray-500'
                  }`}
                >
                  {step.title}
                </p>
                <p className="text-xs text-gray-500">{step.description}</p>
              </div>
            </div>

            {/* Connector line */}
            {index < steps.length - 1 && (
              <div
                className="w-16 h-0.5 mx-4"
                style={{
                  backgroundColor:
                    currentStep > step.number ? branding.brandColor : '#e5e7eb', // fallback to Tailwind gray-200
                }}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );

  const renderCreateCourse = () => (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {renderStepper()}

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Create New Course
          </h2>
          <p className="text-gray-600">
            Fill in the basic information about your course
          </p>
        </div>

        <form onSubmit={handleCreateCourse} className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Course Name *
                </label>
                <input
                  type="text"
                  required
                  value={courseForm.name}
                  onChange={(e) =>
                    setCourseForm((prev) => ({ ...prev, name: e.target.value }))
                  }
                  style={{
                    border: '1px solid #d1d5db',
                    borderRadius: '0.5rem',
                    padding: '0.75rem 1rem',
                    width: '100%',
                    outline: 'none',
                    transition: 'all 0.2s',
                  }}
                  onFocus={(e) =>
                    (e.currentTarget.style.boxShadow = `0 0 0 2px ${branding.brandColor}`)
                  }
                  onBlur={(e) => (e.currentTarget.style.boxShadow = 'none')}
                  placeholder="Enter course name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Course Description *
                </label>
                <textarea
                  required
                  value={courseForm.description}
                  onChange={(e) =>
                    setCourseForm((prev) => ({
                      ...prev,
                      description: e.target.value,
                    }))
                  }
                  style={{
                    border: '1px solid #d1d5db',
                    borderRadius: '0.5rem',
                    padding: '0.75rem 1rem',
                    width: '100%',
                    outline: 'none',
                    transition: 'all 0.2s',
                  }}
                  onFocus={(e) =>
                    (e.currentTarget.style.boxShadow = `0 0 0 2px ${branding.brandColor}`)
                  }
                  onBlur={(e) => (e.currentTarget.style.boxShadow = 'none')}
                  rows={6}
                  placeholder="Describe what students will learn in this course"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Educator ID
                </label>
                <input
                  type="text"
                  value={courseForm.created_by_educator}
                  onChange={(e) =>
                    setCourseForm((prev) => ({
                      ...prev,
                      created_by_educator: e.target.value,
                    }))
                  }
                  style={{
                    border: '1px solid #d1d5db',
                    borderRadius: '0.5rem',
                    padding: '0.75rem 1rem',
                    width: '100%',
                    outline: 'none',
                    transition: 'all 0.2s',
                  }}
                  onFocus={(e) =>
                    (e.currentTarget.style.boxShadow = `0 0 0 2px ${branding.brandColor}`)
                  }
                  onBlur={(e) => (e.currentTarget.style.boxShadow = 'none')}
                  placeholder="Enter educator ID (optional)"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Founder ID
                </label>
                <input
                  type="text"
                  value={courseForm.created_by_founder}
                  onChange={(e) =>
                    setCourseForm((prev) => ({
                      ...prev,
                      created_by_founder: e.target.value,
                    }))
                  }
                  style={{
                    border: '1px solid #d1d5db',
                    borderRadius: '0.5rem',
                    padding: '0.75rem 1rem',
                    width: '100%',
                    outline: 'none',
                    transition: 'all 0.2s',
                  }}
                  onFocus={(e) =>
                    (e.currentTarget.style.boxShadow = `0 0 0 2px ${branding.brandColor}`)
                  }
                  onBlur={(e) => (e.currentTarget.style.boxShadow = 'none')}
                  placeholder="Enter founder ID (optional)"
                />
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Course Thumbnail
                </label>
                <div
                  style={{
                    border: '2px dashed #d1d5db',
                    borderRadius: '0.5rem',
                    padding: '2rem',
                    textAlign: 'center',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = branding.brandColor;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = '#d1d5db';
                  }}
                >
                  <ImageIcon className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-sm text-gray-600 mb-2">
                    Upload course thumbnail
                  </p>
                  <p className="text-xs text-gray-500">PNG, JPG up to 5MB</p>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        setCourseForm((prev) => ({
                          ...prev,
                          thumbnail: URL.createObjectURL(file),
                        }));
                      }
                    }}
                    className="hidden"
                    id="thumbnail-upload"
                  />
                  <label
                    htmlFor="thumbnail-upload"
                    className="mt-4 inline-flex items-center px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 cursor-pointer transition-colors"
                  >
                    Choose File
                  </label>
                </div>
                {courseForm.thumbnail && (
                  <div className="mt-4">
                    <img
                      src={courseForm.thumbnail}
                      alt="Course thumbnail preview"
                      className="w-full h-32 object-cover rounded-lg"
                    />
                  </div>
                )}
              </div>

              <div
                style={{
                  backgroundColor: `${branding.brandColor}20`,
                  border: `1px solid ${branding.brandColor}55`,
                  borderRadius: '0.5rem',
                  padding: '1rem',
                }}
              >
                <h3
                  style={{ color: branding.brandColor }}
                  className="text-sm font-medium mb-2"
                >
                  Course Creation Tips
                </h3>
                <ul
                  style={{ color: branding.brandColor }}
                  className="text-sm space-y-1"
                >
                  <li>• Use a clear, descriptive course name</li>
                  <li>• Write a detailed description of learning outcomes</li>
                  <li>• Upload a high-quality thumbnail image</li>
                  <li>• You can add videos in the next step</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="flex justify-between pt-6 border-t border-gray-200">
            <button
              type="button"
              onClick={() => navigate('/')}
              className="flex items-center space-x-2 px-6 py-3 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors font-medium"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Home</span>
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-6 py-3 text-white rounded-lg transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
              style={{
                backgroundColor: branding.brandColor,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = darken(
                  branding.brandColor,
                  0.1
                );
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = branding.brandColor;
              }}
            >
              {isSubmitting ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Creating...</span>
                </>
              ) : (
                <>
                  <Save className="w-4 h-4" />
                  <span>Create Course</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );

  const renderCourseCreated = () => (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {renderStepper()}

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 text-center">
        <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle className="w-8 h-8 text-emerald-600" />
        </div>

        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Course Created Successfully!
        </h2>
        <p className="text-gray-600 mb-8">
          Your course "{selectedCourse?.name}" has been created. Now let's add
          some videos to make it complete.
        </p>

        {selectedCourse && (
          <div className="bg-gray-50 rounded-lg p-6 mb-8">
            <div className="flex items-center space-x-4">
              <img
                src={selectedCourse.thumbnail}
                alt={selectedCourse.name}
                className="w-20 h-20 object-cover rounded-lg"
              />
              <div className="text-left">
                <h3 className="font-semibold text-gray-900">
                  {selectedCourse.name}
                </h3>
                <p className="text-sm text-gray-600 mt-1">
                  {selectedCourse.description}
                </p>
                <div className="flex items-center space-x-4 mt-2">
                  <span className="text-xs text-gray-500 flex items-center">
                    <Video className="w-3 h-3 mr-1" />
                    {selectedCourse.videos.length} videos
                  </span>
                  <span className="text-xs text-gray-500">
                    Status: {selectedCourse.status}
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => setCurrentView('upload-video')}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200 flex items-center justify-center space-x-2"
          >
            <UploadIcon className="w-4 h-4" />
            <span>Upload First Video</span>
          </button>
          <button
            onClick={() => {
              setCurrentStep(3);
              setCurrentView('course-detail');
            }}
            className="border border-gray-300 text-gray-700 hover:bg-gray-50 px-6 py-3 rounded-lg font-medium transition-colors duration-200"
          >
            Skip for Now
          </button>
        </div>
      </div>
    </div>
  );

  const renderUploadVideo = () => (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {renderStepper()}

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Upload Video
          </h2>
          <p className="text-gray-600">
            Add a video to "{selectedCourse?.name}"
          </p>
        </div>

        <form onSubmit={handleUploadVideo} className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Video Title *
                </label>
                <input
                  type="text"
                  required
                  value={videoForm.title}
                  onChange={(e) =>
                    setVideoForm((prev) => ({ ...prev, title: e.target.value }))
                  }
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                  placeholder="Enter video title"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Video Description *
                </label>
                <textarea
                  required
                  value={videoForm.description}
                  onChange={(e) =>
                    setVideoForm((prev) => ({
                      ...prev,
                      description: e.target.value,
                    }))
                  }
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                  rows={5}
                  placeholder="Describe what this video covers"
                />
              </div>

              <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                <h3 className="text-sm font-medium text-gray-900 mb-2">
                  Course Information
                </h3>
                <div className="space-y-2 text-sm text-gray-600">
                  <p>
                    <span className="font-medium">Course:</span>{' '}
                    {selectedCourse?.name}
                  </p>
                  <p>
                    <span className="font-medium">Current Videos:</span>{' '}
                    {selectedCourse?.videos.length}
                  </p>
                  <p>
                    <span className="font-medium">Status:</span>{' '}
                    {selectedCourse?.status}
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Video File *
                </label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-blue-400 transition-colors">
                  <FileVideo className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-sm text-gray-600 mb-2">
                    Upload your video file
                  </p>
                  <p className="text-xs text-gray-500">
                    MP4, MOV, AVI up to 500MB
                  </p>
                  <input
                    type="file"
                    accept="video/*"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        setVideoForm((prev) => ({ ...prev, videoFile: file }));
                      }
                    }}
                    className="hidden"
                    id="video-upload"
                  />
                  <label
                    htmlFor="video-upload"
                    className="mt-4 inline-flex items-center px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 cursor-pointer transition-colors"
                  >
                    Choose Video File
                  </label>
                </div>
                {videoForm.videoFile && (
                  <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg">
                    <p className="text-sm text-green-800">
                      Selected: {videoForm.videoFile.name} (
                      {(videoForm.videoFile.size / 1024 / 1024).toFixed(2)} MB)
                    </p>
                  </div>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Video Thumbnail (Optional)
                </label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-400 transition-colors">
                  <ImageIcon className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                  <p className="text-xs text-gray-600 mb-2">
                    Upload custom thumbnail
                  </p>
                  <p className="text-xs text-gray-500">PNG, JPG up to 5MB</p>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        setVideoForm((prev) => ({ ...prev, thumbnail: file }));
                      }
                    }}
                    className="hidden"
                    id="video-thumbnail-upload"
                  />
                  <label
                    htmlFor="video-thumbnail-upload"
                    className="mt-2 inline-flex items-center px-3 py-1 border border-gray-300 rounded text-xs font-medium text-gray-700 bg-white hover:bg-gray-50 cursor-pointer transition-colors"
                  >
                    Choose File
                  </label>
                </div>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h3 className="text-sm font-medium text-blue-900 mb-2">
                  Video Upload Tips
                </h3>
                <ul className="text-sm text-blue-800 space-y-1">
                  <li>• Use clear, descriptive video titles</li>
                  <li>
                    • Provide detailed descriptions for better searchability
                  </li>
                  <li>• Upload high-quality video files</li>
                  <li>• Custom thumbnails improve click-through rates</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="flex justify-between pt-6 border-t border-gray-200">
            <button
              type="button"
              onClick={() => setCurrentView('course-created')}
              className="flex items-center space-x-2 px-6 py-3 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors font-medium"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back</span>
            </button>
            <button
              type="submit"
              disabled={isSubmitting || !videoForm.videoFile}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
            >
              {isSubmitting ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Uploading...</span>
                </>
              ) : (
                <>
                  <UploadIcon className="w-4 h-4" />
                  <span>Upload Video</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );

  const renderVideoUploaded = () => (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {renderStepper()}

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 text-center">
        <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle className="w-8 h-8 text-emerald-600" />
        </div>

        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Video Uploaded Successfully!
        </h2>
        <p className="text-gray-600 mb-8">
          Your video has been added to "{selectedCourse?.name}". You now have{' '}
          {selectedCourse?.videos.length} video(s) in this course.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => setCurrentView('upload-video')}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200 flex items-center justify-center space-x-2"
          >
            <Plus className="w-4 h-4" />
            <span>Add Another Video</span>
          </button>
          <button
            onClick={() => {
              setCurrentStep(3);
              setCurrentView('course-detail');
            }}
            className="border border-gray-300 text-gray-700 hover:bg-gray-50 px-6 py-3 rounded-lg font-medium transition-colors duration-200"
          >
            View Course
          </button>
          <button
            onClick={() => navigate('/')}
            className="border border-gray-300 text-gray-700 hover:bg-gray-50 px-6 py-3 rounded-lg font-medium transition-colors duration-200 flex items-center justify-center space-x-2"
          >
            <Home className="w-4 h-4" />
            <span>Back to Dashboard</span>
          </button>
        </div>
      </div>
    </div>
  );

  const renderCourseDetail = () => (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {!courseId && renderStepper()}

      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center">
          <button
            onClick={() => navigate('/')}
            className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors mr-6"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back to Home</span>
          </button>
          <h1 className="text-2xl font-bold text-gray-900">
            {selectedCourse?.name}
          </h1>
        </div>
        <button
          onClick={() => setCurrentView('upload-video')}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors duration-200 flex items-center space-x-2"
        >
          <Plus className="w-4 h-4" />
          <span>Add Video</span>
        </button>
      </div>

      {selectedCourse && (
        <div className="space-y-8">
          {/* Course Overview */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex flex-col lg:flex-row gap-6">
              <img
                src={selectedCourse.thumbnail}
                alt={selectedCourse.name}
                className="w-full lg:w-80 h-48 object-cover rounded-lg"
              />
              <div className="flex-1">
                <h2 className="text-2xl font-bold text-gray-900 mb-3">
                  {selectedCourse.name}
                </h2>
                <p className="text-gray-600 mb-4">
                  {selectedCourse.description}
                </p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="text-center p-3 bg-gray-50 rounded-lg">
                    <Video className="w-6 h-6 text-blue-600 mx-auto mb-1" />
                    <p className="text-sm font-medium text-gray-900">
                      {selectedCourse.videos.length}
                    </p>
                    <p className="text-xs text-gray-500">Videos</p>
                  </div>
                  <div className="text-center p-3 bg-gray-50 rounded-lg">
                    <Users className="w-6 h-6 text-emerald-600 mx-auto mb-1" />
                    <p className="text-sm font-medium text-gray-900">
                      {selectedCourse.students}
                    </p>
                    <p className="text-xs text-gray-500">Students</p>
                  </div>
                  <div className="text-center p-3 bg-gray-50 rounded-lg">
                    <Star className="w-6 h-6 text-yellow-600 mx-auto mb-1" />
                    <p className="text-sm font-medium text-gray-900">
                      {selectedCourse.rating}
                    </p>
                    <p className="text-xs text-gray-500">Rating</p>
                  </div>
                  <div className="text-center p-3 bg-gray-50 rounded-lg">
                    <Clock className="w-6 h-6 text-indigo-600 mx-auto mb-1" />
                    <p className="text-sm font-medium text-gray-900">
                      {selectedCourse.duration}
                    </p>
                    <p className="text-xs text-gray-500">Duration</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Videos List */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">
                Course Videos
              </h3>
            </div>
            <div className="p-6">
              {selectedCourse.videos.length === 0 ? (
                <div className="text-center py-12">
                  <Video className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <h4 className="text-lg font-medium text-gray-900 mb-2">
                    No videos yet
                  </h4>
                  <p className="text-gray-600 mb-4">
                    Start building your course by uploading your first video.
                  </p>
                  <button
                    onClick={() => setCurrentView('upload-video')}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors duration-200 flex items-center space-x-2 mx-auto"
                  >
                    <UploadIcon className="w-4 h-4" />
                    <span>Upload First Video</span>
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  {selectedCourse.videos.map((video, index) => (
                    <div
                      key={video.id}
                      className="flex items-center space-x-4 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      <div className="flex-shrink-0">
                        <img
                          src={video.thumbnail}
                          alt={video.title}
                          className="w-20 h-12 object-cover rounded"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="text-sm font-medium text-gray-900 truncate">
                          {video.title}
                        </h4>
                        <p className="text-sm text-gray-500 truncate">
                          {video.description}
                        </p>
                        <div className="flex items-center space-x-4 mt-1">
                          <span className="text-xs text-gray-500 flex items-center">
                            <Clock className="w-3 h-3 mr-1" />
                            {video.duration}
                          </span>
                          <span className="text-xs text-gray-500 flex items-center">
                            <Eye className="w-3 h-3 mr-1" />
                            {video.views} views
                          </span>
                          <span className="text-xs text-gray-500 flex items-center">
                            <Calendar className="w-3 h-3 mr-1" />
                            {video.uploadDate}
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <button className="text-blue-600 hover:text-blue-700 p-1 rounded transition-colors">
                          <Play className="w-4 h-4" />
                        </button>
                        <button className="text-gray-600 hover:text-gray-700 p-1 rounded transition-colors">
                          <Edit3 className="w-4 h-4" />
                        </button>
                        <button className="text-gray-600 hover:text-gray-700 p-1 rounded transition-colors">
                          <MoreHorizontal className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center h-16">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
                <BookOpen className="w-5 h-5 text-white" />
              </div>
              <h1 className="text-xl font-bold text-gray-900">EduHub</h1>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      {currentView === 'create-course' && renderCreateCourse()}
      {currentView === 'course-created' && renderCourseCreated()}
      {currentView === 'upload-video' && renderUploadVideo()}
      {currentView === 'video-uploaded' && renderVideoUploaded()}
      {currentView === 'course-detail' && renderCourseDetail()}
    </div>
  );
};
