// Create a types file to share types between components

export interface FeedbackItem {
    id: string
    rating: number
    comment: string
    author: {
      name: string
      avatar: string
    }
    date: string
  }
  
  export interface TrainingFeedback {
    satisfaction: number
    comments: FeedbackItem[] | string[]
    ratingDistribution: {
      5: number
      4: number
      3: number
      2: number
      1: number
    }
  }
  
  export interface Training {
    id: number
    title: string
    type: string
    startDate: string
    endDate: string
    status: string
    description: string
    instructor: string
    enrolledCount: number
    maxCapacity: number
    feedback?: TrainingFeedback
    skills?: any[]
    evaluations?: any[]
    hidden?: boolean
  }
  
  