/**
 * Every site begins with content.
 * Everything else is assembled.
 */

export function create() {

    const repository = acquire();

    const site = assemble(repository);

    return render(site);

}
