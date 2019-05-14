import React from 'react'
import { Link } from 'react-router-dom'
import moment from 'moment'
import { Modal, Button } from "react-materialize";

const SpeakerList = ({ speakers, removeSpeaker }) => {

  return (
    <tbody>

      {speakers && speakers.map(speaker => {
        return (
          <tr key={speaker.id}>
            <td><Link to={`/speaker/${speaker.id}/edit`}>{speaker.firstName} {speaker.lastName}</Link></td>
            <td>{speaker.company}</td>
            <td>{speaker.publish ? "Published" : "Not Published"}</td>
            <td><a href={speaker.headshot} target="_blank" rel="noopener noreferrer">

<i class="material-icons" style={{textAlign: "center", width: "100%"}}>
                image
</i></a></td>
            <td>{speaker.createdAt ? moment(speaker.createdAt.toDate()).calendar() : null}</td>
            <td><Modal
              trigger={
                <Button style={{ fontWeight: 'bold', }} className='transparent text-lighten-1 red-text z-depth-0 button-spacing delete-button' waves='light'>X</Button>
              }
              header='Delete this speaker?'
              actions={
                <div>
                  <Button onClick={() => { removeSpeaker(speaker) }} className="modal-close red lighten-1 btn z-depth-0 yes-button">
                    I am sure
                </Button>
                  <Button className="btn lighten-1 z-depth-0 modal-close">
                    No, I will keep this speaker
                </Button>       </div>
              }
            ><p>Are you sure you want to delete this speaker?</p>
              <p>This action can't be undone.</p>
            </Modal>
            </td>
          </tr>
        )

      })}
    </tbody>
  )
}

export default SpeakerList