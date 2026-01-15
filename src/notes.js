export let sections = [];

export function addNote(time, track, length=0, special=null){
  if(sections.length === 0) sections.push({ notes: [], beats: 4, mustHit: true });
  sections[sections.length-1].notes.push([time, track, length, special]);
}

export function generateJSON(songInfo){
  return {
    song: {
      ...songInfo,
      events: [],
      notes: sections.map(sec=>({
        sectionNotes: sec.notes,
        sectionBeats: sec.beats,
        mustHitSection: sec.mustHit
      }))
    }
  };
}
