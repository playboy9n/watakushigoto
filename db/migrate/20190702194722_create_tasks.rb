class CreateTasks < ActiveRecord::Migration[5.2]
  def change
    create_table :tasks do |t|
      t.integer :user_id
      t.integer :level_id
      t.string  :top_task
      t.string :task_body
      t.date :limit_date
      t.boolean :done,  default: false, null: false
      t.boolean :top_btn, default: false, null: false

      t.timestamps
    end
  end
end
