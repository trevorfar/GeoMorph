"use client";

import StyledButton from "@/utils/StyledComponents/Button";


const ConfirmDialog = ({
  setIsDialogVisible,
}: {
  setIsDialogVisible: (visible: boolean) => void;
}) => {
  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-15 flex justify-center items-center z-50">
    <div className="bg-white p-6 rounded-lg w-11/12 md:w-3/4 lg:w-3/4 xl:w-1/2">
        <div className="flex flex-col gap-2 pb-4">
            <div className="flex flex-row">
              <div className="flex justify-end items-center pb-12 h-1/2 w-2/3">
                  <h1 className="text-3xl pr-8">How To Play</h1>
              </div>
              <div className="flex justify-end items-center w-1/3">
                <StyledButton text={"X"} className="bg-red-600" onClick={() =>setIsDialogVisible(false)} />
              </div>
            </div>

      
            <p className="font-semibold text-lg">Start with a 5 letter Word.</p> <p>For example, you are given &quot;<b>Spain&quot;</b>.</p>
            <p>Each game, a new Target Word will be chosen. For example, <b>Italy</b>. This word is revealed immediately. It is up to the player to reach it. </p>
            <p className="font-semibold text-lg">Aids: </p> <p>
            Players get 1 <b>swap</b> to rearrange any letter to any spot of their choosing! <b>NOTE</b>: You do not need to rearrange to a valid word</p>
            <p className="font-semibold text-lg">Rules: </p> <p>  Players can change, or remove letters, but at least <b>two</b> letters must remain from the previous word in the same spot.
            Each morph must form a valid word (e.g., &quot;Spain&quot; → &quot;Stain&quot; → Swap (i and S) &quot; → Itasn&quot; → &quot;Italy&quot;).
            To win, Players must have 3 letters in their previous guess matching 3 letters in the target word. (Place matters)</p>
 

              
        
        </div>
    </div>
  </div>
              
)
      
};

export default ConfirmDialog;
