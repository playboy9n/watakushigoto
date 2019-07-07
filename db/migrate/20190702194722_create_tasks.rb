class CreateTasks < ActiveRecord::Migration[5.2]
  def change
    create_table :tasks do |t|
      t.integer :user_id
      t.string :state
      t.string :task_body
      t.date :limit_date
      t.boolean :done,  default: false, null: false

      t.timestamps
    end
  end
end
