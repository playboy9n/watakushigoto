class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable ,authentication_keys: [:nick_name]
  attachment :profile_image

  # 半角アルファベット（大文字・小文字・数値）
  # validates :nick_name, format: { with: /\A[a-zA-Z0-9]+\z/ }
  # 全角ひらがな、全角カタカナ、漢字
  validates :family_name, format: { with: /\A[ぁ-んァ-ン一-龥]/ }
  validates :my_name, format: { with: /\A[ぁ-んァ-ン一-龥]/ }
  # 半角カナ
  validates :k_family_name, format: { with: /\A[ｧ-ﾝﾞﾟ]+\z/ }
  validates :k_my_name, format: { with: /\A[ｧ-ﾝﾞﾟ]+\z/ }

  # validates :bd, presence: true
  has_many :tasks, dependent: :destroy
  has_many :events, dependent: :destroy
  has_many :levels, dependent: :destroy
  has_many :diaries, dependent: :destroy
end
