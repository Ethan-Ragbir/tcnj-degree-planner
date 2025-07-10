import React, { useState, useEffect } from 'react';
import { Plus, Settings, Download, Upload, Calendar, BookOpen, GraduationCap, Clock, MapPin, Users, Check } from 'lucide-react';

// Course data structure based on real TCNJ courses
const initialCourses = {
  // Physics Core Courses
  'PHY099': {
    id: 'PHY099',
    code: 'PHY 099',
    name: 'Orientation to Physics',
    credits: 0,
    category: 'Physics Core',
    prereqs: [],
    coreqs: [],
    description: 'Required entry course for all physics majors',
    offered: ['Fall'],
    color: '#3b82f6'
  },
  'PHY203': {
    id: 'PHY203',
    code: 'PHY 203',
    name: 'Physics I for Physicists',
    credits: 1,
    category: 'Physics Core',
    prereqs: [],
    coreqs: ['MAT127'],
    description: 'Accelerated calculus-based introductory physics',
    offered: ['Fall', 'Spring'],
    color: '#3b82f6'
  },
  'PHY204': {
    id: 'PHY204',
    code: 'PHY 204',
    name: 'Physics II for Physicists',
    credits: 1,
    category: 'Physics Core',
    prereqs: ['PHY203', 'MAT127'],
    coreqs: ['MAT128'],
    description: 'Second part of accelerated two semester sequence',
    offered: ['Fall', 'Spring'],
    color: '#3b82f6'
  },
  'PHY299': {
    id: 'PHY299',
    code: 'PHY 299',
    name: 'Research Fundamentals Seminar',
    credits: 0.25,
    category: 'Physics Core',
    prereqs: ['PHY099'],
    coreqs: [],
    description: 'Contextualize current research topics in physics',
    offered: ['Fall', 'Spring'],
    color: '#3b82f6'
  },
  'PHY306': {
    id: 'PHY306',
    code: 'PHY 306',
    name: 'Mathematical Physics',
    credits: 1,
    category: 'Physics Core',
    prereqs: ['PHY201', 'MAT128'],
    coreqs: [],
    description: 'Mathematical methods for experimental and theoretical physicists',
    offered: ['Fall'],
    color: '#3b82f6'
  },
  'PHY321': {
    id: 'PHY321',
    code: 'PHY 321',
    name: 'Modern Physics',
    credits: 1,
    category: 'Physics Core',
    prereqs: ['PHY202', 'MAT128'],
    coreqs: [],
    description: 'Modern physics concepts pertaining to microscopic universe',
    offered: ['Fall'],
    color: '#3b82f6'
  },
  'PHY401': {
    id: 'PHY401',
    code: 'PHY 401',
    name: 'Classical Mechanics',
    credits: 1,
    category: 'Physics Core',
    prereqs: ['PHY306', 'PHY321'],
    coreqs: ['MAT326'],
    description: 'Newtonian mechanics using advanced mathematical techniques',
    offered: ['Spring'],
    color: '#3b82f6'
  },
  'PHY421': {
    id: 'PHY421',
    code: 'PHY 421',
    name: 'Electromagnetic Theory I',
    credits: 1,
    category: 'Physics Core',
    prereqs: ['PHY306'],
    coreqs: ['MAT326'],
    description: 'Theory and laws of classical electromagnetism',
    offered: ['Fall'],
    color: '#3b82f6'
  },
  'PHY431': {
    id: 'PHY431',
    code: 'PHY 431',
    name: 'Quantum Mechanics',
    credits: 1,
    category: 'Physics Core',
    prereqs: ['PHY321', 'PHY306'],
    coreqs: [],
    description: 'Fundamental concepts using Schrödinger and matrix approaches',
    offered: ['Fall'],
    color: '#3b82f6'
  },
  'PHY451': {
    id: 'PHY451',
    code: 'PHY 451',
    name: 'Advanced Experimental Physics',
    credits: 1,
    category: 'Physics Capstone',
    prereqs: ['PHY306', 'PHY321'],
    coreqs: [],
    description: 'Writing-intensive capstone course',
    offered: ['Fall', 'Spring'],
    color: '#6366f1'
  },
  // Math Minor Courses
  'MAT127': {
    id: 'MAT127',
    code: 'MAT 127',
    name: 'Calculus A',
    credits: 1,
    category: 'Math Minor',
    prereqs: [],
    coreqs: [],
    description: 'Single-variable calculus for mathematical and physical sciences',
    offered: ['Fall', 'Spring'],
    color: '#ec4899'
  },
  'MAT128': {
    id: 'MAT128',
    code: 'MAT 128',
    name: 'Calculus B',
    credits: 1,
    category: 'Math Minor',
    prereqs: ['MAT127'],
    coreqs: [],
    description: 'Integral calculus and series',
    offered: ['Fall', 'Spring'],
    color: '#ec4899'
  },
  'MAT229': {
    id: 'MAT229',
    code: 'MAT 229',
    name: 'Multivariable Calculus',
    credits: 1,
    category: 'Math Minor',
    prereqs: ['MAT128'],
    coreqs: [],
    description: 'Geometry of three dimensional space, derivatives of functions of several variables',
    offered: ['Fall', 'Spring'],
    color: '#ec4899'
  },
  'MAT205': {
    id: 'MAT205',
    code: 'MAT 205',
    name: 'Linear Algebra: Theory and Applications',
    credits: 1,
    category: 'Math Minor',
    prereqs: ['MAT128'],
    coreqs: [],
    description: 'Vector spaces and systems of linear equations',
    offered: ['Fall', 'Spring'],
    color: '#ec4899'
  },
  'MAT326': {
    id: 'MAT326',
    code: 'MAT 326',
    name: 'Differential Equations',
    credits: 1,
    category: 'Math Minor',
    prereqs: ['MAT128'],
    coreqs: [],
    description: 'Study of deterministic models of nature',
    offered: ['Fall', 'Spring'],
    color: '#ec4899'
  }
};

const initialSemesters = {
  'Fall 2024': ['PHY099', 'PHY203', 'MAT127', 'FSP'],
  'Spring 2025': ['PHY204', 'MAT128', 'LANG1', 'CORE1'],
  'Fall 2025': ['PHY299', 'PHY321', 'MAT229', 'MAT205'],
  'Spring 2026': ['PHY306', 'MAT326', 'LANG2', 'CORE2'],
  'Fall 2026': ['PHY431', 'PHY421', 'PHYOPT1', 'STEM1'],
  'Spring 2027': ['PHY401', 'PHY356', 'PHYOPT2', 'STEM2'],
  'Fall 2027': ['PHYOPT3', 'PHYOPT4', 'STEM3', 'CORE3'],
  'Spring 2028': ['PHY451', 'STEM4', 'STEM5', 'CORE4']
};

const TCNJPlanner = () => {
  const [courses, setCourses] = useState(initialCourses);
  const [semesters, setSemesters] = useState(initialSemesters);
  const [completedCourses, setCompletedCourses] = useState(new Set());
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [showCourseSearch, setShowCourseSearch] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [draggedCourse, setDraggedCourse] = useState(null);

  const categoryColors = {
    'Physics Core': '#3b82f6',
    'Physics Capstone': '#6366f1',
    'Math Minor': '#ec4899',
    'Physics Options': '#10b981',
    'STEM Electives': '#f59e0b',
    'College Core': '#8b5cf6'
  };

  const CourseCard = ({ course, inSemester = false, semesterName = null }) => {
    const isCompleted = completedCourses.has(course.id);
    const canTake = course.prereqs.every(prereq => completedCourses.has(prereq));
    
    return (
      <div
        className={`
          relative bg-white rounded-lg border-2 p-3 cursor-pointer transition-all duration-200 hover:shadow-lg
          ${isCompleted ? 'border-green-500 bg-green-50' : canTake ? 'border-gray-200 hover:border-blue-300' : 'border-red-200 bg-red-50'}
          ${inSemester ? 'mb-2' : 'mb-3'}
        `}
        draggable
        onDragStart={(e) => {
          setDraggedCourse(course.id);
          e.dataTransfer.effectAllowed = 'move';
        }}
        onClick={() => setSelectedCourse(course)}
      >
        <div className="flex items-start justify-between">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <div
                className="w-3 h-3 rounded-full flex-shrink-0"
                style={{ backgroundColor: course.color }}
              />
              <h3 className="font-semibold text-sm text-gray-900 truncate">
                {course.code}
              </h3>
              <span className="text-xs bg-gray-100 px-2 py-1 rounded">
                {course.credits} cr
              </span>
            </div>
            <p className="text-xs text-gray-600 line-clamp-2 mb-2">
              {course.name}
            </p>
            <div className="flex items-center gap-2 text-xs text-gray-500">
              <Clock size={12} />
              <span>{course.offered.join(', ')}</span>
            </div>
          </div>
          <div className="flex flex-col items-end gap-1 ml-2">
            <button
              onClick={(e) => {
                e.stopPropagation();
                if (isCompleted) {
                  setCompletedCourses(prev => {
                    const newSet = new Set(prev);
                    newSet.delete(course.id);
                    return newSet;
                  });
                } else {
                  setCompletedCourses(prev => new Set([...prev, course.id]));
                }
              }}
              className={`
                w-5 h-5 rounded border-2 flex items-center justify-center transition-colors
                ${isCompleted ? 'bg-green-500 border-green-500 text-white' : 'border-gray-300 hover:border-green-400'}
              `}
            >
              {isCompleted && <Check size={12} />}
            </button>
            {inSemester && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setSemesters(prev => ({
                    ...prev,
                    [semesterName]: prev[semesterName].filter(id => id !== course.id)
                  }));
                }}
                className="w-5 h-5 bg-red-100 hover:bg-red-200 text-red-600 rounded text-xs flex items-center justify-center"
              >
                ×
              </button>
            )}
          </div>
        </div>
        
        {course.prereqs.length > 0 && (
          <div className="mt-2 pt-2 border-t border-gray-100">
            <p className="text-xs text-gray-500">
              Prereqs: {course.prereqs.map(prereq => courses[prereq]?.code || prereq).join(', ')}
            </p>
          </div>
        )}
      </div>
    );
  };

  const SemesterColumn = ({ semesterName, courseIds }) => {
    const semesterCourses = courseIds.map(id => courses[id]).filter(Boolean);
    const totalCredits = semesterCourses.reduce((sum, course) => sum + course.credits, 0);
    
    return (
      <div className="bg-gray-50 rounded-lg p-4 min-h-96">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-gray-900">{semesterName}</h3>
          <div className="text-sm text-gray-600">
            {totalCredits} credits
          </div>
        </div>
        
        <div
          className="min-h-80 space-y-2"
          onDragOver={(e) => {
            e.preventDefault();
            e.dataTransfer.dropEffect = 'move';
          }}
          onDrop={(e) => {
            e.preventDefault();
            if (draggedCourse && !courseIds.includes(draggedCourse)) {
              setSemesters(prev => {
                const newSemesters = { ...prev };
                // Remove from other semesters
                Object.keys(newSemesters).forEach(sem => {
                  newSemesters[sem] = newSemesters[sem].filter(id => id !== draggedCourse);
                });
                // Add to this semester
                newSemesters[semesterName] = [...(newSemesters[semesterName] || []), draggedCourse];
                return newSemesters;
              });
            }
            setDraggedCourse(null);
          }}
        >
          {semesterCourses.map(course => (
            <CourseCard 
              key={course.id} 
              course={course} 
              inSemester={true}
              semesterName={semesterName}
            />
          ))}
          
          <button
            onClick={() => setShowCourseSearch(semesterName)}
            className="w-full border-2 border-dashed border-gray-300 rounded-lg p-4 text-gray-500 hover:border-blue-400 hover:text-blue-600 transition-colors flex items-center justify-center gap-2"
          >
            <Plus size={16} />
            Add Course
          </button>
        </div>
      </div>
    );
  };

  const CourseDetailModal = ({ course, onClose }) => {
    if (!course) return null;
    
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" onClick={onClose}>
        <div className="bg-white rounded-xl p-6 max-w-md w-full mx-4" onClick={(e) => e.stopPropagation()}>
          <div className="flex items-start justify-between mb-4">
            <div>
              <h2 className="text-xl font-bold text-gray-900">{course.code}</h2>
              <h3 className="text-lg text-gray-700">{course.name}</h3>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 text-xl font-bold"
            >
              ×
            </button>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center gap-4 text-sm text-gray-600">
              <div className="flex items-center gap-1">
                <GraduationCap size={16} />
                <span>{course.credits} credits</span>
              </div>
              <div className="flex items-center gap-1">
                <Calendar size={16} />
                <span>{course.offered.join(', ')}</span>
              </div>
            </div>
            
            <div
              className="inline-block px-3 py-1 rounded-full text-sm font-medium text-white"
              style={{ backgroundColor: course.color }}
            >
              {course.category}
            </div>
            
            <p className="text-gray-700">{course.description}</p>
            
            {course.prereqs.length > 0 && (
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">Prerequisites:</h4>
                <div className="space-y-1">
                  {course.prereqs.map(prereqId => {
                    const prereq = courses[prereqId];
                    const isCompleted = completedCourses.has(prereqId);
                    return prereq ? (
                      <div
                        key={prereqId}
                        className={`flex items-center gap-2 text-sm p-2 rounded ${
                          isCompleted ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                        }`}
                      >
                        <div className={`w-2 h-2 rounded-full ${isCompleted ? 'bg-green-500' : 'bg-red-500'}`} />
                        {prereq.code} - {prereq.name}
                      </div>
                    ) : (
                      <div key={prereqId} className="text-sm text-gray-600">
                        {prereqId}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
            
            {course.coreqs.length > 0 && (
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">Corequisites:</h4>
                <div className="text-sm text-gray-600">
                  {course.coreqs.map(coreq => courses[coreq]?.code || coreq).join(', ')}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  const CourseSearchModal = ({ semesterName, onClose }) => {
    const availableCourses = Object.values(courses).filter(course => 
      !semesters[semesterName]?.includes(course.id) &&
      (searchTerm === '' || 
       course.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
       course.name.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" onClick={onClose}>
        <div className="bg-white rounded-xl p-6 max-w-2xl w-full mx-4 max-h-96 overflow-hidden" onClick={(e) => e.stopPropagation()}>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-gray-900">Add Course to {semesterName}</h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 text-xl font-bold"
            >
              ×
            </button>
          </div>
          
          <input
            type="text"
            placeholder="Search courses..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
            autoFocus
          />
          
          <div className="overflow-y-auto max-h-64 space-y-2">
            {availableCourses.map(course => (
              <div
                key={course.id}
                onClick={() => {
                  setSemesters(prev => ({
                    ...prev,
                    [semesterName]: [...(prev[semesterName] || []), course.id]
                  }));
                  onClose();
                }}
                className="cursor-pointer"
              >
                <CourseCard course={course} />
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  const ProgressSummary = () => {
    const totalCourses = Object.keys(courses).length;
    const completedCount = completedCourses.size;
    const progressPercent = Math.round((completedCount / totalCourses) * 100);
    
    const coreCompleted = Object.values(courses).filter(c => 
      c.category === 'Physics Core' && completedCourses.has(c.id)
    ).length;
    const mathCompleted = Object.values(courses).filter(c => 
      c.category === 'Math Minor' && completedCourses.has(c.id)
    ).length;
    
    return (
      <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Degree Progress</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">{completedCount}/{totalCourses}</div>
            <div className="text-sm text-gray-600">Courses Completed</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-pink-600">{mathCompleted}/5</div>
            <div className="text-sm text-gray-600">Math Minor</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">{coreCompleted}/9</div>
            <div className="text-sm text-gray-600">Physics Core</div>
          </div>
        </div>
        
        <div className="w-full bg-gray-200 rounded-full h-3">
          <div 
            className="bg-gradient-to-r from-blue-500 to-pink-500 h-3 rounded-full transition-all duration-300"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
        <div className="text-center mt-2 text-sm text-gray-600">
          {progressPercent}% Complete
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <GraduationCap className="w-8 h-8 text-blue-600 mr-3" />
              <div>
                <h1 className="text-xl font-bold text-gray-900">TCNJ Physics + Math Minor</h1>
                <p className="text-sm text-gray-600">Degree Planning Tool</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                <Download size={16} />
                Export
              </button>
              <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                <Settings size={16} />
                Settings
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <ProgressSummary />
        
        {/* Semester Planning Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {Object.entries(semesters).map(([semesterName, courseIds]) => (
            <SemesterColumn
              key={semesterName}
              semesterName={semesterName}
              courseIds={courseIds}
            />
          ))}
        </div>
        
        {/* Course Bank */}
        <div className="mt-8 bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Course Bank</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {Object.values(courses)
              .filter(course => !Object.values(semesters).flat().includes(course.id))
              .map(course => (
                <CourseCard key={course.id} course={course} />
              ))
            }
          </div>
        </div>
      </div>

      {/* Modals */}
      {selectedCourse && (
        <CourseDetailModal
          course={selectedCourse}
          onClose={() => setSelectedCourse(null)}
        />
      )}
      
      {showCourseSearch && (
        <CourseSearchModal
          semesterName={showCourseSearch}
          onClose={() => {
            setShowCourseSearch(false);
            setSearchTerm('');
          }}
        />
      )}
    </div>
  );
};

export default TCNJPlanner;
