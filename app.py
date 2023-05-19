from typing import Final

from beaker import *
from pyteal import *


class CounterState:
    counter: Final[GlobalStateValue] = GlobalStateValue(
        stack_type=TealType.uint64,
        default=Int(0),
        descr="Counter",
    )

    last_caller_address: Final[GlobalStateValue] = GlobalStateValue(
        stack_type=TealType.bytes,
        default=Global.creator_address(),
        descr="Last caller address",
    )

    # last_caller_name: Final[GlobalStateValue] = GlobalStateValue(
    #     stack_type=TealType.bytes,
    #     descr="Last caller name",
    # )


app = Application("Counter", state=CounterState).apply(
    unconditional_create_approval, initialize_global_state=True
)


# @app.create
# def create() -> Expr:
#     return app.initialize_global_state()


@app.external
def increment(*, output: abi.Uint64) -> Expr:
    return Seq(
        # Increment the counter
        app.state.counter.set(app.state.counter + Int(1)),
        # Save caller address
        app.state.last_caller_address.set(Txn.sender()),
        output.set(app.state.counter)
    )


if __name__ == "__main__":
    app.build().export("./artifacts")
