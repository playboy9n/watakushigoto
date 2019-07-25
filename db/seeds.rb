# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

#管理者
admin = Admin.new(:email => 'hogehoge@gmail.com', :password=> 'hugahuga')
level = Level.create(id: admin.id)
admin.save!

#ユーザー
25.times do
  Faker::Config.locale = :ja
    user_name = Faker::Internet.username
    user_name = Faker::Games::Pokemon.name
    email = Faker::Internet.email

  User.create!(
    nick_name: rand(1000000..9999999),
    user_name: user_name,
    family_name: '佐野',
    my_name: '浩一',
    k_family_name: 'ｻﾉ',
    k_my_name: 'ｺｳｲﾁ',
    email: email,
    password: rand(1000000..9999999),
    bd: '20190501',
    phone_number: rand(00000000000...99999999999),
    gender: '秘密',
    )

end

