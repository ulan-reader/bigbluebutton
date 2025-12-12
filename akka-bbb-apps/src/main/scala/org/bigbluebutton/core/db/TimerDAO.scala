package org.bigbluebutton.core.db

import org.bigbluebutton.core.apps.TimerModel
<<<<<<< HEAD
import org.bigbluebutton.core.apps.TimerModel.{getAccumulated, getIsActive, isRunning, getStartedAt, isStopwatch, getTime, getTrack, isElapsed}
=======
import org.bigbluebutton.core.apps.TimerModel.{getAccumulated, getIsActive, isRunning, getStartedAt, isStopwatch, getTime, getTrack}
>>>>>>> origin/master-dev
import slick.jdbc.PostgresProfile.api._

case class TimerDbModel(
    meetingId:        String,
    stopwatch:        Boolean,
    running:          Boolean,
    active:           Boolean,
    time:             Long,
    accumulated:      Long,
<<<<<<< HEAD
    startedAt:        Option[java.sql.Timestamp],
    songTrack:        String,
    elapsed:          Boolean,
=======
    startedOn:        Long,
    songTrack:        String,
>>>>>>> origin/master-dev
)

class TimerDbTableDef(tag: Tag) extends Table[TimerDbModel](tag, None, "timer") {
  val meetingId = column[String]("meetingId", O.PrimaryKey)
  val stopwatch = column[Boolean]("stopwatch")
  val running = column[Boolean]("running")
  val active = column[Boolean]("active")
  val time = column[Long]("time")
  val accumulated = column[Long]("accumulated")
<<<<<<< HEAD
  val startedAt = column[Option[java.sql.Timestamp]]("startedAt")
  val songTrack = column[String]("songTrack")
  val elapsed = column[Boolean]("elapsed")
  override def * = (meetingId, stopwatch, running, active, time, accumulated, startedAt, songTrack, elapsed) <> (TimerDbModel.tupled, TimerDbModel.unapply)
=======
  val startedOn = column[Long]("startedOn")
  val songTrack = column[String]("songTrack")
  override def * = (meetingId, stopwatch, running, active, time, accumulated, startedOn, songTrack) <> (TimerDbModel.tupled, TimerDbModel.unapply)
>>>>>>> origin/master-dev
}

object TimerDAO {
  def insert(meetingId: String, model: TimerModel) = {
    DatabaseConnection.enqueue(
      TableQuery[TimerDbTableDef].insertOrUpdate(
        TimerDbModel(
          meetingId = meetingId,
          stopwatch = isStopwatch(model),
          running = isRunning(model),
          active = getIsActive(model),
          time = getTime(model),
          accumulated = getAccumulated(model),
<<<<<<< HEAD
          startedAt = getStartedAt(model),
          songTrack = getTrack(model),
          elapsed = isElapsed(model),
=======
          startedOn = getStartedAt(model),
          songTrack = getTrack(model),
>>>>>>> origin/master-dev
        )
      )
    )
  }

  def update(meetingId: String, timerModel: TimerModel) = {
    DatabaseConnection.enqueue(
      TableQuery[TimerDbTableDef]
        .filter(_.meetingId === meetingId)
<<<<<<< HEAD
        .map(t => (t.stopwatch, t.running, t.active, t.time, t.accumulated, t.startedAt, t.songTrack, t.elapsed))
        .update(
          (isStopwatch(timerModel), isRunning(timerModel), getIsActive(timerModel), getTime(timerModel),
          getAccumulated(timerModel), getStartedAt(timerModel), getTrack(timerModel), isElapsed(timerModel))
=======
        .map(t => (t.stopwatch, t.running, t.active, t.time, t.accumulated, t.startedOn, t.songTrack))
        .update(
          (isStopwatch(timerModel), isRunning(timerModel), getIsActive(timerModel), getTime(timerModel),
          getAccumulated(timerModel), getStartedAt(timerModel), getTrack(timerModel))
>>>>>>> origin/master-dev
        )
    )
  }
}