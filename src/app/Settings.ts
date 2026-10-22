export type TypeCADSettings={theme:"dark"|"light"|"system";units:"mm"|"cm"|"m"|"in"|"ft";autosaveSeconds:number;maxUndoSteps:number;gridVisible:boolean;snapEnabled:boolean;orthoEnabled:boolean;polarTrackingEnabled:boolean;dynamicInputEnabled:boolean;confirmDestructiveActions:boolean};
const KEY="typecad:settings";
export const DEFAULT_SETTINGS:TypeCADSettings={theme:"dark",units:"mm",autosaveSeconds:15,maxUndoSteps:100,gridVisible:true,snapEnabled:false,orthoEnabled:false,polarTrackingEnabled:false,dynamicInputEnabled:true,confirmDestructiveActions:true};
export class SettingsStore{
 load():TypeCADSettings{try{const raw=localStorage.getItem(KEY);return raw?{...DEFAULT_SETTINGS,...JSON.parse(raw) as Partial<TypeCADSettings>}:{...DEFAULT_SETTINGS};}catch{return{...DEFAULT_SETTINGS};}}
 save(s:TypeCADSettings):void{if(s.autosaveSeconds<5||s.autosaveSeconds>600)throw new RangeError("Autosave interval must be between 5 and 600 seconds");if(s.maxUndoSteps<10||s.maxUndoSteps>1000)throw new RangeError("Undo history must be between 10 and 1000");localStorage.setItem(KEY,JSON.stringify(s));}
 reset():TypeCADSettings{localStorage.removeItem(KEY);return{...DEFAULT_SETTINGS};}
}