class Tutor < User
  has_many :tutor_students
  has_many :students, through: :tutor_students
  has_many :assignments, as: :imageable
  
end
