import algosdk from "algosdk";
import * as bkr from "beaker-ts";
export class Counter extends bkr.ApplicationClient {
    desc: string = "";
    override appSchema: bkr.Schema = { declared: { counter: { type: bkr.AVMType.uint64, key: "counter", desc: "", static: false }, last_caller_address: { type: bkr.AVMType.bytes, key: "last_caller_address", desc: "", static: false } }, reserved: {} };
    override acctSchema: bkr.Schema = { declared: {}, reserved: {} };
    override approvalProgram: string = "I3ByYWdtYSB2ZXJzaW9uIDgKaW50Y2Jsb2NrIDAgMQpieXRlY2Jsb2NrIDB4NjM2Zjc1NmU3NDY1NzIgMHg2YzYxNzM3NDVmNjM2MTZjNmM2NTcyNWY2MTY0NjQ3MjY1NzM3Mwp0eG4gTnVtQXBwQXJncwppbnRjXzAgLy8gMAo9PQpibnogbWFpbl9sNAp0eG5hIEFwcGxpY2F0aW9uQXJncyAwCnB1c2hieXRlcyAweDRhMzI1OTAxIC8vICJpbmNyZW1lbnQoKXVpbnQ2NCIKPT0KYm56IG1haW5fbDMKZXJyCm1haW5fbDM6CnR4biBPbkNvbXBsZXRpb24KaW50Y18wIC8vIE5vT3AKPT0KdHhuIEFwcGxpY2F0aW9uSUQKaW50Y18wIC8vIDAKIT0KJiYKYXNzZXJ0CmNhbGxzdWIgaW5jcmVtZW50XzEKc3RvcmUgMApwdXNoYnl0ZXMgMHgxNTFmN2M3NSAvLyAweDE1MWY3Yzc1CmxvYWQgMAppdG9iCmNvbmNhdApsb2cKaW50Y18xIC8vIDEKcmV0dXJuCm1haW5fbDQ6CnR4biBPbkNvbXBsZXRpb24KaW50Y18wIC8vIE5vT3AKPT0KYm56IG1haW5fbDYKZXJyCm1haW5fbDY6CnR4biBBcHBsaWNhdGlvbklECmludGNfMCAvLyAwCj09CmFzc2VydApjYWxsc3ViIGNyZWF0ZV8wCmludGNfMSAvLyAxCnJldHVybgoKLy8gY3JlYXRlCmNyZWF0ZV8wOgpwcm90byAwIDAKYnl0ZWNfMCAvLyAiY291bnRlciIKaW50Y18wIC8vIDAKYXBwX2dsb2JhbF9wdXQKYnl0ZWNfMSAvLyAibGFzdF9jYWxsZXJfYWRkcmVzcyIKZ2xvYmFsIENyZWF0b3JBZGRyZXNzCmFwcF9nbG9iYWxfcHV0CnJldHN1YgoKLy8gaW5jcmVtZW50CmluY3JlbWVudF8xOgpwcm90byAwIDEKaW50Y18wIC8vIDAKYnl0ZWNfMCAvLyAiY291bnRlciIKYnl0ZWNfMCAvLyAiY291bnRlciIKYXBwX2dsb2JhbF9nZXQKaW50Y18xIC8vIDEKKwphcHBfZ2xvYmFsX3B1dApieXRlY18xIC8vICJsYXN0X2NhbGxlcl9hZGRyZXNzIgp0eG4gU2VuZGVyCmFwcF9nbG9iYWxfcHV0CmJ5dGVjXzAgLy8gImNvdW50ZXIiCmFwcF9nbG9iYWxfZ2V0CmZyYW1lX2J1cnkgMApyZXRzdWI=";
    override clearProgram: string = "I3ByYWdtYSB2ZXJzaW9uIDgKcHVzaGludCAwIC8vIDAKcmV0dXJu";
    override methods: algosdk.ABIMethod[] = [
        new algosdk.ABIMethod({ name: "increment", desc: "", args: [], returns: { type: "uint64", desc: "" } })
    ];
    async increment(txnParams?: bkr.TransactionOverrides): Promise<bkr.ABIResult<bigint>> {
        const result = await this._execute(await this.compose.increment(txnParams));
        return new bkr.ABIResult<bigint>(result, result.returnValue as bigint);
    }
    compose = {
        increment: async (txnParams?: bkr.TransactionOverrides, atc?: algosdk.AtomicTransactionComposer): Promise<algosdk.AtomicTransactionComposer> => {
            return this._addMethodCall(algosdk.getMethodByName(this.methods, "increment"), {}, txnParams, atc);
        }
    };
}
