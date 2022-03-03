/*
 * Couldn't inject the db with multiline string literals through direct commands in discord.
 * And I want my fuckin multiline string literals.
 * So I hardcoded this file to hold some premium 100% certified not-stolen haikus.
 *
 * NB: I just added multiline string literals to the regex for adding trivia with .trivia
 */

export default function randomHaiku() {
  const randIndex = Math.floor(Math.random() * haikus.length + 1);
  return haikus[randIndex];
}

const haikus = [
  `    Your file was so big. 
    It might be very useful. 
    But now it is gone. 
    -- David J. Liszewski `,
  `    The Website you seek 
    Cannot be located, but 
    Countless more exist. 
    -- Joy Rothke `,
  `    Chaos reigns within. 
    Reflect, repent, and reboot. 
    Order shall return. 
    -- Suzie Wagner `,
  `    ABORTED effort: 
    Close all that you have. 
    You ask way too much. 
    -- Mike Hagler`,
  `    Windows NT crashed. 
    I am the Blue Screen of Death. 
    No one hears your screams. 
    -- Peter Rothman `,
  `    Yesterday it worked. 
    Today it is not working. 
    Windows is like that. 
    -- Margaret Segall `,
  `    First snow, then silence. 
    This thousand dollar screen dies 
    so beautifully. 
    -- Simon Firth `,
  `    With searching comes loss 
    And the presence of absence: 
    "My Novel" not found. 
    -- Howard Korder `,
  `    The Tao that is seen 
    Is not the true Tao, until 
    You bring fresh toner. 
    -- Bill Torcaso `,
  `    Stay the patient course 
    Of little worth is your ire 
    The network is down 
    -- David Ansel `,
  `    A crash reduces 
    your expensive computer 
    to a simple stone. 
    -- James Lopez `,
  `    Three things are certain: 
    Death, taxes and lost data. 
    Guess which has occurred. 
    -- David Dixon `,
  `    You step in the stream, 
    But the water has moved on. 
    This page is not here. 
    -- Cass Whittington `,
  `   Out of memory. 
    We wish to hold the whole sky, 
    But we never will. 
    -- Francis Heaney `,
  `    Having been erased, 
    The document you're seeking 
    Must now be retyped. 
    -- Judy Birmingham `,
  `    Serious error. 
    All shortcuts have disappeared. 
    Screen. Mind. Both are blank. 
    -- Ian Hughes `,
  `    I am the master. 
    You have nowhere to run to. 
    Microsoft can't die. 
    -- UnknownAuthor`,
  `    Beauty, success, truth ... 
    He is blessed who has two. 
    Your program has none.`,
  `    Some bugs have names 
    Others inscrutable numbers 
    Yours has not even that. `,
  `    Forces in balance: 
    Yin and Yang, your program has 
    Mistakes up the latter `,
  `    Wish to know the sound 
    Of one file defragmenting? 
    Hear! What? There were more? `,
  `    Who is more foolish? 
    The fool who errs or debugs? 
    Oh, they are both you? `,
  `    Riddle for student 
    What error is so fatal 
    It has no message `,
  `    Compiler error. 
    Code, like wives, may still work 
    Too bad, yours did not. `,
  `    Some incompetence 
    Fundamentally transcends 
    Mere error message. `,
  `    Cogito ergo 
    sum. But I worry about 
    user. Click OK. `,
  `    Only one user 
    One application error 
    All open are closed `,
  `    Voltage is ancient 
    A half second power sag 
    No time to save you `,
  `    MS-DOS upgrade 
    Bill Gates was nice about it 
    Expand and rename `,
  `    All your code pristine 
    Works perfect in Mozilla 
    IE knows this not `,
  `    There is not enough 
    Memory available 
    to display this err `,
  `    Before there was Tao 
    There was the void known as Null 
    Don't reference it `,
  `    From formless chaos 
    Each thread seeks resolution 
    a race condition `,
  `    A Vista appears 
    Slow, annoying, unstable 
    Microsoft progress `,
  `    Media too old. 
    Pick abort, retry, ignore 
    To see the next error. `,
];
