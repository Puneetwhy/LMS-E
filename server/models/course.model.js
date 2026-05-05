import { model, Schema } from 'mongoose';

const courseSchema = new Schema({
  title: {
    type: String,
    required: [true, 'Title is required'],
    minLength: [8, 'Title must be at least 8 characters'],
    maxLength: [60, 'Title should be less than 60 characters'],
    trim: true,
  },
  description: {
    type: String,
    required: [true, 'Description is required'],
    minLength: [20, 'Description must be at least 20 characters'],
    maxLength: [250, 'Description should be less than 250 characters'],
    trim: true,
  },
  category: {
    type: String,
    required: [true, 'Category is required'],
  },
  thumbnail: {
    public_id: {
      type: String,
      // ✅ Fixed: was required:true — Course.create() sets this to ""
      // then saves after cloudinary upload. Required blocks the initial create.
    },
    secure_url: {
      type: String,
      // ✅ Fixed: same reason
    }
  },
  lectures: [
    {
      title: String,
      description: String,
      lecture: {
        public_id: {
          type: String,
          // ✅ Fixed: was required:true — this blocked adding any lecture
          // because the object is initialized as {} before cloudinary upload
        },
        secure_url: {
          type: String,
          // ✅ Fixed: same reason
        }
      }
    }
  ],
  numberOfLectures: {
    type: Number,
    default: 0,
  },
  createdBy: {
    type: String,
    required: true,
  }
}, {
  timestamps: true
});

const Course = model('Course', courseSchema);
export default Course;
