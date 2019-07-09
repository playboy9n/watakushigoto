class CreateEvents < ActiveRecord::Migration[5.2]
  def change
    create_table :events do |t|
      t.integer :user_id
      t.string :title
      t.text :event_body
      t.datetime :start_time
      t.datetime :end_time
      t.datetime :start_date
      t.datetime :end_date
      t.string :color
      t.boolean :allday
      t.timestamps
    end
  end
end
