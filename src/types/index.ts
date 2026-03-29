export interface Beat {
  id: string
  user_id: string
  title: string
  genre: string
  bpm: number
  key: string
  price_basic: number
  price_premium: number
  price_exclusive: number
  tags: string[]
  plays: number
  sales: number
  audio_url: string
  cover_url: string
  is_exclusive_sold: boolean
  created_at: string
  deleted_at: string | null
}

export interface License {
  id: string
  user_id: string
  beat_id: string
  license_type: 'basic' | 'premium' | 'exclusive'
  amount_paid: number
  created_at: string
  deleted_at: string | null
}

export interface Profile {
  id: string
  user_id: string
  display_name: string
  bio: string
  genre_focus: string
  avatar_url: string
  total_sales: number
  total_revenue: number
  referral_code: string
  created_at: string
  deleted_at: string | null
}

export interface CollabRequest {
  id: string
  user_id: string
  beat_id: string
  message: string
  status: 'pending' | 'accepted' | 'declined'
  created_at: string
  deleted_at: string | null
}

export interface AnalyticsSummary {
  total_beats: number
  total_plays: number
  total_sales: number
  total_revenue: number
}
